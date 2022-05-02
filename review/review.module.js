"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModule = void 0;
const common_1 = require("@nestjs/common");
const review_service_1 = require("./review.service");
const review_resolver_1 = require("./review.resolver");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("../user/user.module");
const review_schema_1 = require("./review.schema");
const booking_module_1 = require("./../booking/booking.module");
let ReviewModule = class ReviewModule {
};
ReviewModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            booking_module_1.BookingModule,
            mongoose_1.MongooseModule.forFeature([{ name: review_schema_1.Review.name, schema: review_schema_1.ReviewSchema }], 'DB1'),
        ],
        providers: [review_resolver_1.ReviewResolver, review_service_1.ReviewService],
        exports: [review_service_1.ReviewService],
    })
], ReviewModule);
exports.ReviewModule = ReviewModule;
//# sourceMappingURL=review.module.js.map