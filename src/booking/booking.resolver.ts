import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { User } from 'src/user/user.schema';
import {
  Booking,
  BookingIdInput,
  BookingInput,
  BookingInputByStar,
  DateRangeInput,
  UpdateBookingFinalStatusInputBySender,
} from './booking.schema';
import { BookingService } from './booking.service';
import { CurrentUser } from '../auth/decorator/currentUser.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UserIdInput } from './../user/user.schema';

@Resolver('Booking')
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Booking)
  async createBooking(
    @Args('input') input: BookingInput,
    @CurrentUser() user: User,
  ) {
    return this.bookingService.createBooking(input, user._id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Booking)
  async rejectBookingStatusByStar(
    @Args('input') input: BookingIdInput,
    @CurrentUser() user: User,
  ) {
    return this.bookingService.rejectBookingStatusByStar(input, user._id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Booking)
  async updateBookingStatusByStarWithTerms(
    @Args('input') input: BookingInputByStar,
    @CurrentUser() user: User,
  ) {
    return this.bookingService.updateBookingStatusByStarWithTerms(
      input,
      user._id,
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Booking)
  async updateBookingFinalStatusBySenderWithPayment(
    @Args('input') input: UpdateBookingFinalStatusInputBySender,
    @CurrentUser() user: User,
  ) {
    return this.bookingService.updateBookingFinalStatusBySenderThenPayByVenmo(
      input,
      user._id,
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Booking)
  async rejectFinalBookingStatusBySender(
    @Args('input') input: BookingIdInput,
    @CurrentUser() user: User,
  ) {
    return this.bookingService.rejectFinalBookingStatusBySender(
      input,
      user._id,
    );
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Booking])
  async getNextBookingEventsByStarId(@Args('input') input: UserIdInput) {
    return this.bookingService.getNextBookingEventsByStarId(input);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Booking])
  async getUserAssociatedEventsWeeklyOrMonthly(
    @Args('input') input: DateRangeInput,
    @CurrentUser() c_user: User,
  ) {
    return this.bookingService.getUserAssociatedEventsWeeklyOrMonthly(
      c_user._id,
      input.type,
    );
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Booking)
  async cancelAnyAssociatedBooking(
    @Args('input') input: BookingIdInput,
    @CurrentUser() c_user: User,
  ) {
    return this.bookingService.cancelAnyAssociatedBooking(input, c_user._id);
  }
}
