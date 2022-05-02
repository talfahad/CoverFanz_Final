import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Review, ReviewDocument, ReviewInput } from './review.schema';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { UserTypeEnum } from '../user/user.types';
import { BookingService } from 'src/booking/booking.service';
import { BookingIdInput } from './../booking/booking.schema';
export declare class ReviewService {
    private reviewModel;
    private userService;
    private bookingService;
    constructor(reviewModel: Model<ReviewDocument>, userService: UserService, bookingService: BookingService);
    submitReview(input: ReviewInput, c_userId: string): Promise<BadRequestException | NotFoundException | (Review & import("mongoose").Document<any, any, any> & {
        _id: any;
    })>;
    getAssociatedReviewByBookingEventId(input: BookingIdInput, c_userId: string): Promise<Review & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    aggregateAndCalculateRating(review_to: string, userType: UserTypeEnum): Promise<import("../user/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    deleteAllAssociatedReviewsByGivenUserIdOnAccountDeletion(userId: string): Promise<any>;
}
