import * as mongoose from 'mongoose';
import { User } from '../user/user.schema';
import { Booking } from '../booking/booking.schema';
import { UserTypeEnum } from '../user/user.types';
export declare class Review {
    _id: string;
    title: string;
    message: string;
    rating: number;
    reviewer_type: UserTypeEnum;
    review_to: User;
    reviewed_by: User;
    booking_id: Booking;
    createdAt: Date;
}
export declare type ReviewDocument = Review & mongoose.Document;
export declare const ReviewSchema: mongoose.Schema<mongoose.Document<Review, any, any>, mongoose.Model<mongoose.Document<Review, any, any>, any, any, any>, {}, {}>;
export declare class ReviewInput {
    title: string;
    message: string;
    rating: number;
    booking_id: string;
}
export declare class ReviewIdInput {
    review_id: string;
}
