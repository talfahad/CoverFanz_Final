import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingResolver } from './booking.resolver';
import { Booking, BookingSchema } from './booking.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './../user/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature(
      [{ name: Booking.name, schema: BookingSchema }],
      'DB1',
    ),
  ],
  providers: [BookingResolver, BookingService],
  exports: [BookingService],
})
export class BookingModule {}
