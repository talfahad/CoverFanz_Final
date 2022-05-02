"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionModule = void 0;
const common_1 = require("@nestjs/common");
const promotion_service_1 = require("./promotion.service");
const promotion_resolver_1 = require("./promotion.resolver");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("../user/user.module");
const promotion_schema_1 = require("./promotion.schema");
const booking_module_1 = require("../booking/booking.module");
let PromotionModule = class PromotionModule {
};
PromotionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            booking_module_1.BookingModule,
            mongoose_1.MongooseModule.forFeature([{ name: promotion_schema_1.Promotion.name, schema: promotion_schema_1.PromotionSchema }], 'DB1'),
        ],
        providers: [promotion_resolver_1.PromotionResolver, promotion_service_1.PromotionService],
        exports: [promotion_service_1.PromotionService],
    })
], PromotionModule);
exports.PromotionModule = PromotionModule;
//# sourceMappingURL=promotion.module.js.map