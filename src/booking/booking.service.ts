import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Booking,
  BookingDocument,
  BookingIdInput,
  BookingInput,
  BookingInputByStar,
  UpdateBookingFinalStatusInputBySender,
} from './booking.schema';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { UserTypeEnum } from '../user/user.types';
import { BookingTypeEnum, DateRangeType } from './booking.types';
import { bookingPopulateOption } from './booking.utils';
import moment from 'moment';
import { UserIdInput } from './../user/user.schema';
@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name)
    private bookingModel: Model<BookingDocument>,
    private userService: UserService,
  ) {}

  async createBooking(input: BookingInput, id: string) {
    if (!moment(input.date).isAfter(new Date())) {
      return new BadRequestException(
        'You can create a booking event for future date only.',
      );
    }

    const sender = await this.userService.getUserById(id);
    const receiver = await this.userService.getUserById(input.star_id);

    if (!sender || !receiver) {
      return new BadRequestException(
        'One of the sender or recever account is not found.',
      );
    }

    if (!sender.premium || !receiver.premium) {
      return new HttpException(
        'Only Subscribed fan or venue can send or receive request.',
        HttpStatus.PAYMENT_REQUIRED,
      );
    }

    if (sender.userType === UserTypeEnum.STAR)
      return new BadRequestException('Only Fan or Venue can Book Star');

    let newUser;
    if (sender.userType === 'fan') {
      newUser = { ...input, fan_id: id, isPersonal: true };
    }

    if (sender.userType === 'venue') {
      newUser = { ...input, venue_id: id };
    }

    const booking = await this.bookingModel.create(newUser);
    await this.userService.updateBookingForUser(
      booking.star_id._id,
      booking._id,
    );

    if (booking.fan_id) {
      await this.userService.updateBookingForUser(
        booking.fan_id._id,
        booking._id,
      );
    }

    if (booking.venue_id) {
      await this.userService.updateBookingForUser(
        booking.venue_id as unknown as string,
        booking._id,
      );
    }

    return booking;
  }

  async rejectBookingStatusByStar(input: BookingIdInput, c_userId: string) {
    const { booking_id } = input;

    const booking = await this.getBookingById(booking_id);
    const user = await this.userService.getUserById(c_userId);

    if (!booking || !user) {
      return new NotFoundException(
        'The booking is not found, check the booking ID again.',
      );
    }

    if (
      user.userType !== UserTypeEnum.STAR ||
      !user._id.equals(booking.star_id._id)
    ) {
      return new BadRequestException(
        'Only requested star can Take the decission of rejecting.',
      );
    }

    booking.status = BookingTypeEnum.REJECTED_BY_STAR;
    booking.accepted = false;

    await booking.save({ validateBeforeSave: false });

    return booking;
  }

  async updateBookingStatusByStarWithTerms(
    input: BookingInputByStar,
    c_userId: string,
  ) {
    const { booking_id, restrictionsByStar, termsByStar } = input;

    const booking = await this.getBookingById(booking_id);
    const user = await this.userService.getUserById(c_userId);

    if (!booking || !user) {
      return new NotFoundException(
        'The booking is not found, check the booking ID again.',
      );
    }

    if (
      user.userType !== UserTypeEnum.STAR ||
      !user._id.equals(booking.star_id._id)
    ) {
      return new BadRequestException(
        'Only requested star can Take the decission of sending terms and restrictions.',
      );
    }

    booking.termsByStar = termsByStar ?? '';
    booking.restrictionsByStar = restrictionsByStar ?? '';
    booking.status = BookingTypeEnum.ACCEPTED_BY_STAR;

    await booking.save({ validateBeforeSave: false });

    return booking;
  }

  async updateBookingFinalStatusBySenderThenPayByVenmo(
    input: UpdateBookingFinalStatusInputBySender,
    c_userId: string,
  ) {
    const { booking_id, accepted } = input;

    const booking = await this.getBookingById(booking_id);
    const user = await this.userService.getUserById(c_userId);

    if (!booking || !user) {
      return new NotFoundException(
        'The booking is not found, check the booking ID again.',
      );
    }

    if (
      user.userType === UserTypeEnum.STAR ||
      !user._id.equals(booking.fan_id?._id || booking.venue_id?._id)
    ) {
      return new BadRequestException(
        'Only sender (fan/venue) can Take the final decission of payment and accept the booking.',
      );
    }

    booking.status = BookingTypeEnum.ACCEPTED;
    booking.accepted = accepted;

    await booking.save({ validateBeforeSave: false });

    return booking;
  }

  async rejectFinalBookingStatusBySender(
    input: BookingIdInput,
    c_userId: string,
  ) {
    const { booking_id } = input;

    const booking = await this.getBookingById(booking_id);
    const user = await this.userService.getUserById(c_userId);

    if (!booking || !user) {
      return new NotFoundException(
        'The booking is not found, check the booking ID again.',
      );
    }

    if (
      user.userType === UserTypeEnum.STAR ||
      !user._id.equals(booking.fan_id?._id || booking.venue_id?._id)
    ) {
      return new BadRequestException(
        'Only sender (fan/venue) can Take the final decission of rejection.',
      );
    }

    booking.status = BookingTypeEnum.REJECTED;
    booking.accepted = false;

    await booking.save({ validateBeforeSave: false });

    return booking;
  }

  async deleteFutureBooking(input: BookingIdInput, c_userId: string) {
    const { booking_id } = input;
    const booking = await this.getBookingById(booking_id);

    if (!moment(booking.date).isAfter(new Date())) {
      return new BadRequestException('Only future event can be deleted.');
    }

    const sender = await this.userService.getUserById(c_userId);
    const receiver = await this.userService.getUserById(booking.star_id._id);

    if (!booking || !sender || !receiver) {
      return new NotFoundException(
        'The booking, sender or receiver is not found, check the IDs again.',
      );
    }

    if (sender.userType === UserTypeEnum.STAR) {
      return new BadRequestException(
        'Only sender (fan/venue) can delete any future event.',
      );
    }

    // Deleting booking id from sender booking activity
    const newSenderBooking = sender.booking.map((el) => {
      if (!booking._id.equals(el._id)) return el;
    });
    sender.booking = newSenderBooking;

    await sender.save({ validateBeforeSave: false });

    // Deleting booking id from receiver booking activity
    const newReceiverBooking = receiver.booking.map((el) => {
      if (!booking._id.equals(el._id)) return el;
    });
    receiver.booking = newReceiverBooking;
    await receiver.save({ validateBeforeSave: false });

    await this.bookingModel.findByIdAndDelete(booking._id);

    return null;
  }

  async getBookingById(id: string) {
    const booking = await this.bookingModel
      .findById(id)
      .populate(bookingPopulateOption);

    if (!booking) {
      return null;
    }
    return booking;
  }

  async getNextBookingEventsByStarId(input: UserIdInput) {
    // Get All Future Booking Event By Star User ID from Booking Schema {date:{$gt: ISODate('2022-04-06T19:33:14+06:00')}, star_id:ObjectId('6248873a4107697ca42393de')}

    const dateNow = moment(new Date()).format();
    const bookings = this.bookingModel.find({
      star_id: input._id,
      date: { $gt: dateNow },
    });

    return bookings;
  }

  async getUserAssociatedEventsWeeklyOrMonthly(
    c_userId: string,
    type: DateRangeType,
  ) {
    const dateStart = moment().startOf(type).format();
    const dateEnd = moment().endOf(type).format();

    const user = await this.userService.getUserById(c_userId);
    if (!user)
      return new BadRequestException('Invalid user, Try loggin in again.');

    if (user.userType === UserTypeEnum.STAR) {
      return await this.bookingModel
        .find({
          star_id: c_userId,
          accepted: true,
          date: { $gte: dateStart, $lte: dateEnd },
        })
        .populate(bookingPopulateOption);
    }

    if (user.userType === UserTypeEnum.FAN) {
      return await this.bookingModel
        .find({
          fan_id: c_userId,
          accepted: true,
          date: { $gte: dateStart, $lte: dateEnd },
        })
        .populate(bookingPopulateOption);
    }

    if (user.userType === UserTypeEnum.VENUE) {
      return await this.bookingModel
        .find({
          venue_id: c_userId,
          accepted: true,
          date: { $gte: dateStart, $lte: dateEnd },
        })
        .populate(bookingPopulateOption);
    }
  }

  // Call Only When User Is Going to Deleted
  async deleteAllAssociatedBookingsByGivenUserIdOnAccountDeletion(
    userId: string,
  ) {
    await this.bookingModel.deleteMany({ fan_id: userId });
    await this.bookingModel.deleteMany({ venue_id: userId });

    await this.bookingModel.deleteMany({ star_id: userId });
    return null;
  }

  async cancelAnyAssociatedBooking(input: BookingIdInput, c_userId: string) {
    const { booking_id } = input;
    const booking = await this.getBookingById(booking_id);
    const user = await this.userService.getUserById(c_userId);

    if (!booking || !user) {
      return new NotFoundException(
        'The booking is not found, check the booking ID again.',
      );
    }

    if (
      !user._id.equals(booking.star_id._id) &&
      !user._id.equals(booking.venue_id?._id) &&
      !user._id.equals(booking.fan_id?._id)
    ) {
      return new BadRequestException(
        'You are not permitted to Cancel this booking.',
      );
    }

    booking.status = BookingTypeEnum.CANCELLED;

    await booking.save({ validateBeforeSave: false });

    return booking;
  }
}
