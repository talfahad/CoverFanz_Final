import { BadRequestException } from '@nestjs/common';
import { Promotion, PromotionDocument, PromotionIdInput, PromotionInput } from './promotion.schema';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { BookingService } from '../booking/booking.service';
export declare class PromotionService {
    private promotionModel;
    private userService;
    private bookingService;
    constructor(promotionModel: Model<PromotionDocument>, userService: UserService, bookingService: BookingService);
    createPromotion(input: PromotionInput, c_userId: string): Promise<BadRequestException | (Promotion & import("mongoose").Document<any, any, any> & {
        _id: any;
    })>;
    deletePromotionById(input: PromotionIdInput, c_userId: string): Promise<BadRequestException>;
    deleteExpiredPromotions(): Promise<any>;
    getPromotionById(promotion_id: string): Promise<Promotion & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    deleteAllAssociatedPromotionsByGivenUserIdOnAccountDeletion(userId: string): Promise<any>;
}
