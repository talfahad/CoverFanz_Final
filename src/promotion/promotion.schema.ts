/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';
import { User } from '../user/user.schema';
import { Booking } from '../booking/booking.schema';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
@ObjectType()
export class Promotion {
  @Field(() => ID) //<- GraphQL
  _id: string; //<- TypeScript

  @Prop({ default: '' })
  @Field()
  title: string;

  @Prop({ default: '' })
  @Field()
  description: string;

  @Prop({ default: 0 })
  @Field()
  discount: number;

  @Prop()
  @Field()
  expiration: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true })
  @Field(() => User)
  star_id: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true })
  @Field(() => User)
  venue_id: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'booking',
    required: true,
  })
  @Field(() => Booking)
  booking_id: Booking;

  @Field()
  createdAt: Date;
}

export type PromotionDocument = Promotion & mongoose.Document;

export const PromotionSchema = SchemaFactory.createForClass(Promotion);

PromotionSchema.index({
  venue_id: 1,
  booking_id: 1,
  star_id: 1,
});

@InputType()
export class PromotionInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  discount: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  booking_id: string;

  @IsNotEmpty()
  @IsDateString()
  @Field()
  expiration: string;
}

@InputType()
export class PromotionIdInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  promotion_id: string;
}
