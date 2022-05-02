"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionIdInput = exports.PromotionInput = exports.PromotionSchema = exports.Promotion = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = __importStar(require("mongoose"));
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const user_schema_1 = require("../user/user.schema");
const booking_schema_1 = require("../booking/booking.schema");
let Promotion = class Promotion {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Promotion.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Promotion.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Promotion.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Promotion.prototype, "discount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Promotion.prototype, "expiration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }),
    (0, graphql_1.Field)(() => user_schema_1.User),
    __metadata("design:type", user_schema_1.User)
], Promotion.prototype, "star_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }),
    (0, graphql_1.Field)(() => user_schema_1.User),
    __metadata("design:type", user_schema_1.User)
], Promotion.prototype, "venue_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'booking',
        required: true,
    }),
    (0, graphql_1.Field)(() => booking_schema_1.Booking),
    __metadata("design:type", booking_schema_1.Booking)
], Promotion.prototype, "booking_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Promotion.prototype, "createdAt", void 0);
Promotion = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }),
    (0, graphql_1.ObjectType)()
], Promotion);
exports.Promotion = Promotion;
exports.PromotionSchema = mongoose_1.SchemaFactory.createForClass(Promotion);
exports.PromotionSchema.index({
    venue_id: 1,
    booking_id: 1,
    star_id: 1,
});
let PromotionInput = class PromotionInput {
};
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PromotionInput.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PromotionInput.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PromotionInput.prototype, "discount", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PromotionInput.prototype, "booking_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PromotionInput.prototype, "expiration", void 0);
PromotionInput = __decorate([
    (0, graphql_1.InputType)()
], PromotionInput);
exports.PromotionInput = PromotionInput;
let PromotionIdInput = class PromotionIdInput {
};
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PromotionIdInput.prototype, "promotion_id", void 0);
PromotionIdInput = __decorate([
    (0, graphql_1.InputType)()
], PromotionIdInput);
exports.PromotionIdInput = PromotionIdInput;
//# sourceMappingURL=promotion.schema.js.map