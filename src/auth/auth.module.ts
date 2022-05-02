import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './../user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { ConfigService } from '@nestjs/config';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthController } from './auth.controller';
import { MailModule } from '../mail/mail.module';
import { ReviewModule } from './../review/review.module';
import { PromotionModule } from './../promotion/promotion.module';
import { ReportModule } from './../report/report.module';
import { BookingModule } from './../booking/booking.module';
@Module({
  imports: [
    UserModule,
    MailModule,
    ReviewModule,
    PromotionModule,
    ReportModule,
    BookingModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'DB1'),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '30d',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthResolver, AuthService, JwtStrategy, GoogleStrategy],
  exports: [JwtStrategy, GoogleStrategy, PassportModule],
})
export class AuthModule {}
