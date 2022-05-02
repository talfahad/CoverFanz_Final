/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { User } from 'src/user/user.schema';
import { Promotion, PromotionInput, PromotionIdInput } from './promotion.schema';
import { PromotionService } from './promotion.service';
export declare class PromotionResolver {
    private readonly promotionService;
    constructor(promotionService: PromotionService);
    createPromotion(input: PromotionInput, user: User): Promise<import("@nestjs/common").BadRequestException | (Promotion & import("mongoose").Document<any, any, any> & {
        _id: any;
    })>;
    deletePromotionById(input: PromotionIdInput, user: User): Promise<import("@nestjs/common").BadRequestException>;
}
