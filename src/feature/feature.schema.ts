/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
@ObjectType()
export class Feature {
  @Field(() => ID) //<- GraphQL
  _id: string; //<- TypeScript

  @Prop({ unique: true, required: true })
  @Field()
  entertrainerFeature: string;
}

export type FeatureDocument = Feature & mongoose.Document;

export const FeatureSchema = SchemaFactory.createForClass(Feature);

FeatureSchema.index({ reportedBy: 1, reportedTo: 1 });

@InputType()
export class FeatureInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  entertrainerFeature: string;
}

@InputType()
export class FeatureIdInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  _id: string;
}
