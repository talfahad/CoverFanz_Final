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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const review_schema_1 = require("./review.schema");
const mongoose_2 = require("mongoose");
const user_service_1 = require("../user/user.service");
const user_types_1 = require("../user/user.types");
const moment_1 = __importDefault(require("moment"));
const booking_service_1 = require("../booking/booking.service");
const functions_1 = require("./../utils/functions");
let ReviewService = class ReviewService {
    constructor(reviewModel, userService, bookingService) {
        this.reviewModel = reviewModel;
        this.userService = userService;
        this.bookingService = bookingService;
    }
    async submitReview(input, c_userId) {
        var _a, _b, _c;
        const { booking_id } = input;
        const targetBooking = await this.bookingService.getBookingById(booking_id);
        const currentUser = await this.userService.getUserById(c_userId);
        if (!targetBooking)
            return new common_1.NotFoundException('Target Booking is Not Found!');
        if ((0, moment_1.default)(targetBooking.date).isAfter(new Date())) {
            return new common_1.BadRequestException('You can review past events only.');
        }
        const isExists = await this.reviewModel.find({
            booking_id: targetBooking._id,
            reviewed_by: c_userId,
        });
        if (isExists.length !== 0) {
            return new common_1.BadRequestException('You Already reviewed this Event.');
        }
        let review_to = '';
        let reviewer_type = user_types_1.UserTypeEnum.FAN;
        if (currentUser.userType === user_types_1.UserTypeEnum.VENUE &&
            currentUser._id.equals((_a = targetBooking.venue_id) === null || _a === void 0 ? void 0 : _a._id)) {
            review_to = targetBooking.star_id._id;
            reviewer_type = user_types_1.UserTypeEnum.VENUE;
        }
        if (currentUser.userType === user_types_1.UserTypeEnum.FAN &&
            currentUser._id.equals((_b = targetBooking.fan_id) === null || _b === void 0 ? void 0 : _b._id)) {
            review_to = targetBooking.star_id._id;
            reviewer_type = user_types_1.UserTypeEnum.FAN;
        }
        if (currentUser.userType === user_types_1.UserTypeEnum.STAR &&
            currentUser._id.equals((_c = targetBooking.star_id) === null || _c === void 0 ? void 0 : _c._id)) {
            review_to = targetBooking.venue_id._id;
            reviewer_type = user_types_1.UserTypeEnum.STAR;
        }
        if (review_to === '') {
            return new common_1.BadRequestException('You are not permitted to review, May be you are not associated with this event.');
        }
        const newReview = Object.assign(Object.assign({}, input), { review_to, reviewed_by: currentUser._id, reviewer_type });
        const review = await this.reviewModel.create(newReview);
        await this.aggregateAndCalculateRating(review.review_to._id, review.reviewer_type);
        await this.userService.updateReviewForUser(review.reviewed_by._id, review._id);
        await this.userService.updateReviewForUser(review.review_to._id, review._id);
        return review;
    }
    async getAssociatedReviewByBookingEventId(input, c_userId) {
        const review = await this.reviewModel.findOne({
            booking_id: input.booking_id,
            reviewed_by: c_userId,
        });
        if (!review) {
            return null;
        }
        return review;
    }
    async aggregateAndCalculateRating(review_to, userType) {
        const user = await this.userService.getUserById(review_to);
        const fieldName = `ratingBy${(0, functions_1.capitalizeFirstLetter)(userType)}`;
        const userRating = await this.reviewModel.aggregate([
            {
                $match: {
                    reviewer_type: userType,
                    review_to: user._id,
                },
            },
            {
                $group: {
                    _id: '$review_to',
                    averageRating: {
                        $avg: '$rating',
                    },
                },
            },
        ]);
        if (userRating.length === 0) {
            return null;
        }
        user[fieldName] = userRating[0].averageRating;
        await user.save({ validateBeforeSave: false });
        return user;
    }
    async deleteAllAssociatedReviewsByGivenUserIdOnAccountDeletion(userId) {
        await this.reviewModel.deleteMany({ reviewed_by: userId });
        await this.reviewModel.deleteMany({ review_to: userId });
        return null;
    }
};
ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(review_schema_1.Review.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        booking_service_1.BookingService])
], ReviewService);
exports.ReviewService = ReviewService;
//# sourceMappingURL=review.service.js.map