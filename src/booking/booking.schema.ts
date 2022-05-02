/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsBoolean, IsDateString } from 'class-validator';
import { User } from '../user/user.schema';
import { BookingTypeEnum, DateRangeType } from './booking.types';
import { Review } from './../review/review.schema';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
@ObjectType()
export class Booking {
  @Field(() => ID) //<- GraphQL
  _id: string; //<- TypeScript

  @Prop({ default: '' })
  @Field()
  title: string;

  @Prop({ default: '' }) //<- Mongoose
  @Field()
  typeOfWork: string;

  @Prop({ default: '' })
  @Field()
  termsByStar: string;

  @Prop({ default: '' })
  @Field()
  description: string;

  @Prop({ default: '' })
  @Field()
  restrictionsByStar: string;

  @Prop()
  @Field()
  date: Date;

  @Prop()
  @Field()
  payment: number;

  @Prop()
  @Field()
  startTime: string;

  @Prop()
  @Field()
  endTime: string;

  @Prop()
  @Field()
  hoursWorked: number;

  @Prop()
  @Field()
  location: string;

  @Prop({ default: false })
  @Field()
  isPersonal: boolean;

  @Prop({ default: false })
  @Field({ nullable: true })
  accepted: boolean;

  @Prop({ default: BookingTypeEnum.PENDING })
  @Field()
  status: BookingTypeEnum;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  })
  @Field(() => User)
  star_id: User;

  // One of this two id will be empty.
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  @Field(() => User, { nullable: true })
  fan_id: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  @Field(() => User, { nullable: true })
  venue_id: User;

  @Field()
  createdAt: Date;
}

export type BookingDocument = Booking & mongoose.Document;

export const BookingSchema = SchemaFactory.createForClass(Booking);

BookingSchema.index({ email: 1, date: 1, accepted: 1, status: 1, star_id: 1 });

@InputType()
export class BookingInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  location: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  typeOfWork: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  @Field()
  date: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  endTime: string;

  @IsNotEmpty()
  @Field()
  payment: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  star_id: string;
}

@InputType()
export class BookingInputByStar {
  @IsString()
  @Field({ nullable: true })
  termsByStar: string;

  @IsString()
  @Field({ nullable: true })
  restrictionsByStar: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  booking_id: string;
}

@InputType()
export class BookingIdInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  booking_id: string;
}

@InputType()
export class UpdateBookingFinalStatusInputBySender {
  @IsNotEmpty()
  @IsString()
  @Field()
  booking_id: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field()
  accepted: boolean;
}

@InputType()
export class DateRangeInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  type: DateRangeType;
}
