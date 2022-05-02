import * as mongoose from 'mongoose';
import { User } from '../user/user.schema';
import { Booking } from '../booking/booking.schema';
export declare class Promotion {
    _id: string;
    title: string;
    description: string;
    discount: number;
    expiration: Date;
    star_id: User;
    venue_id: User;
    booking_id: Booking;
    createdAt: Date;
}
export declare type PromotionDocument = Promotion & mongoose.Document;
export declare const PromotionSchema: mongoose.Schema<mongoose.Document<Promotion, any, any>, mongoose.Model<mongoose.Document<Promotion, any, any>, any, any, any>, {}, {}>;
export declare class PromotionInput {
    title: string;
    description: string;
    discount: number;
    booking_id: string;
    expiration: string;
}
export declare class PromotionIdInput {
    promotion_id: string;
}
