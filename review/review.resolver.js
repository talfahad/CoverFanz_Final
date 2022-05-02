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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const currentUser_decorator_1 = require("../auth/decorator/currentUser.decorator");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
const user_schema_1 = require("../user/user.schema");
const review_schema_1 = require("./review.schema");
const review_service_1 = require("./review.service");
const booking_schema_1 = require("./../booking/booking.schema");
let ReviewResolver = class ReviewResolver {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async submitReview(input, user) {
        return this.reviewService.submitReview(input, user._id);
    }
    async getAssociatedReviewByBookingEventId(input, user) {
        return this.reviewService.getAssociatedReviewByBookingEventId(input, user._id);
    }
};
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Mutation)(() => review_schema_1.Review),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, currentUser_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_schema_1.ReviewInput,
        user_schema_1.User]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "submitReview", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Query)(() => review_schema_1.Review, { nullable: true }),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, currentUser_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_schema_1.BookingIdInput,
        user_schema_1.User]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "getAssociatedReviewByBookingEventId", null);
ReviewResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [review_service_1.ReviewService])
], ReviewResolver);
exports.ReviewResolver = ReviewResolver;
//# sourceMappingURL=review.resolver.js.map