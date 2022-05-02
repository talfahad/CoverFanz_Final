import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Promotion,
  PromotionDocument,
  PromotionIdInput,
  PromotionInput,
} from './promotion.schema';

import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { BookingService } from '../booking/booking.service';
import { promotionPopulateOption } from './promotion.utils';
import { UserTypeEnum } from 'src/user/user.types';
import moment from 'moment';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class PromotionService {
  constructor(
    @InjectModel(Promotion.name)
    private promotionModel: Model<PromotionDocument>,
    private userService: UserService,
    private bookingService: BookingService,
  ) {}

  // Only Venue who book star can submit Promotion
  async createPromotion(input: PromotionInput, c_userId: string) {
    const { booking_id, expiration } = input;

    const user = await this.userService.getUserById(c_userId);

    if (user.userType !== UserTypeEnum.VENUE)
      return new BadRequestException(
        'Only Venue Profile can create a promotion',
      );

    const booking = await this.bookingService.getBookingById(booking_id);

    // Restrict Expiration time greater than now
    if (!moment(expiration).isAfter(moment())) {
      return new BadRequestException(
        'Promotion Expiration date must be greater than current time',
      );
    }

    // Restrict for only future active event
    if (!moment(booking.date).isAfter(moment()) || !booking.accepted) {
      return new BadRequestException(
        'You can Promote a futute active event only.',
      );
    }

    // Checking Ownership
    if (!user._id.equals(booking.venue_id._id))
      return new BadRequestException(
        "You don't have permission to create promotion for this event!",
      );

    const isExists = this.promotionModel.findOne({
      booking_id,
      venue_id: user._id,
    });

    if (isExists)
      return new BadRequestException(
        'You already created a promotion on this event, check activity to see and delete the promotions.',
      );

    const newPromotion = {
      ...input,
      venue_id: user._id,
      star_id: booking.star_id._id,
    };

    const promotion = await this.promotionModel.create(newPromotion);

    await this.userService.updatePromotionForUser(
      promotion.venue_id._id,
      promotion._id,
    );
    await this.userService.updatePromotionForUser(
      promotion.star_id._id,
      promotion._id,
    );

    return promotion;
  }

  // Venue Profile who creates the promotion is Permitted Only
  async deletePromotionById(input: PromotionIdInput, c_userId: string) {
    const { promotion_id } = input;
    const user = await this.userService.getUserById(c_userId);
    const promotion = await this.getPromotionById(promotion_id);

    // Checking Ownership
    if (!user._id.equals(promotion.venue_id._id))
      return new BadRequestException(
        "You don't have permission to delete this promotion!",
      );

    await this.promotionModel.findByIdAndDelete(promotion_id);
    return null;
  }

  @Cron('0 0 * * *')
  async deleteExpiredPromotions() {
    await this.promotionModel.deleteMany({ expiration: { $lt: new Date() } });
    console.log('Deleted Expired Promotions.');
    return null;
  }

  async getPromotionById(promotion_id: string) {
    const promotion = await this.promotionModel
      .findById(promotion_id)
      .populate(promotionPopulateOption);

    if (!promotion) return null;

    return promotion;
  }

  async deleteAllAssociatedPromotionsByGivenUserIdOnAccountDeletion(
    userId: string,
  ) {
    await this.promotionModel.deleteMany({ venue_id: userId });
    await this.promotionModel.deleteMany({ star_id: userId });
    return null;
  }
}
