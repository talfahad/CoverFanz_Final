"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const promotion_schema_1 = require("./promotion.schema");
const mongoose_2 = require("mongoose");
const user_service_1 = require("../user/user.service");
const booking_service_1 = require("../booking/booking.service");
const promotion_utils_1 = require("./promotion.utils");
const user_types_1 = require("../user/user.types");
const moment_1 = __importDefault(require("moment"));
const schedule_1 = require("@nestjs/schedule");
let PromotionService = class PromotionService {
    constructor(promotionModel, userService, bookingService) {
        this.promotionModel = promotionModel;
        this.userService = userService;
        this.bookingService = bookingService;
    }
    async createPromotion(input, c_userId) {
        const { booking_id, expiration } = input;
        const user = await this.userService.getUserById(c_userId);
        if (user.userType !== user_types_1.UserTypeEnum.VENUE)
            return new common_1.BadRequestException('Only Venue Profile can create a promotion');
        const booking = await this.bookingService.getBookingById(booking_id);
        if (!(0, moment_1.default)(expiration).isAfter((0, moment_1.default)())) {
            return new common_1.BadRequestException('Promotion Expiration date must be greater than current time');
        }
        if (!(0, moment_1.default)(booking.date).isAfter((0, moment_1.default)()) || !booking.accepted) {
            return new common_1.BadRequestException('You can Promote a futute active event only.');
        }
        if (!user._id.equals(booking.venue_id._id))
            return new common_1.BadRequestException("You don't have permission to create promotion for this event!");
        const isExists = this.promotionModel.findOne({
            booking_id,
            venue_id: user._id,
        });
        if (isExists)
            return new common_1.BadRequestException('You already created a promotion on this event, check activity to see and delete the promotions.');
        const newPromotion = Object.assign(Object.assign({}, input), { venue_id: user._id, star_id: booking.star_id._id });
        const promotion = await this.promotionModel.create(newPromotion);
        await this.userService.updatePromotionForUser(promotion.venue_id._id, promotion._id);
        await this.userService.updatePromotionForUser(promotion.star_id._id, promotion._id);
        return promotion;
    }
    async deletePromotionById(input, c_userId) {
        const { promotion_id } = input;
        const user = await this.userService.getUserById(c_userId);
        const promotion = await this.getPromotionById(promotion_id);
        if (!user._id.equals(promotion.venue_id._id))
            return new common_1.BadRequestException("You don't have permission to delete this promotion!");
        await this.promotionModel.findByIdAndDelete(promotion_id);
        return null;
    }
    async deleteExpiredPromotions() {
        await this.promotionModel.deleteMany({ expiration: { $lt: new Date() } });
        console.log('Deleted Expired Promotions.');
        return null;
    }
    async getPromotionById(promotion_id) {
        const promotion = await this.promotionModel
            .findById(promotion_id)
            .populate(promotion_utils_1.promotionPopulateOption);
        if (!promotion)
            return null;
        return promotion;
    }
    async deleteAllAssociatedPromotionsByGivenUserIdOnAccountDeletion(userId) {
        await this.promotionModel.deleteMany({ venue_id: userId });
        await this.promotionModel.deleteMany({ star_id: userId });
        return null;
    }
};
__decorate([
    (0, schedule_1.Cron)('0 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PromotionService.prototype, "deleteExpiredPromotions", null);
PromotionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(promotion_schema_1.Promotion.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        booking_service_1.BookingService])
], PromotionService);
exports.PromotionService = PromotionService;
//# sourceMappingURL=promotion.service.js.map