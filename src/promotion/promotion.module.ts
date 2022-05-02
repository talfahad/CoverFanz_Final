import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionResolver } from './promotion.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { Promotion, PromotionSchema } from './promotion.schema';
import { BookingModule } from '../booking/booking.module';

@Module({
  imports: [
    UserModule,
    BookingModule,
    MongooseModule.forFeature(
      [{ name: Promotion.name, schema: PromotionSchema }],
      'DB1',
    ),
  ],
  providers: [PromotionResolver, PromotionService],
  exports: [PromotionService],
})
export class PromotionModule {}
