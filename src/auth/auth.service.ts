import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import Ctx from '../types/context.type';
import { LoginUserInput, User, UserDocument } from 'src/user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { cookieOptions } from '../config.schema';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { ReviewService } from '../review/review.service';
import { BookingService } from './../booking/booking.service';
import { PromotionService } from './../promotion/promotion.service';
import { ReportService } from './../report/report.service';
import { UserTypeEnum } from 'src/user/user.types';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private mailService: MailService,
    private configService: ConfigService,
    private userService: UserService,
    private bookingService: BookingService,
    private reviewService: ReviewService,
    private promotionService: PromotionService,
    private reportService: ReportService,
  ) {}

  async login(input: LoginUserInput, context: Ctx) {
    const { email, password } = input;

    const socialUser = await this.userModel.findOne({
      email,
      socialAccount: true,
    });

    if (socialUser) {
      throw new ConflictException(
        'Email is Associated With Social login Method!',
      );
    }

    const dUser = await this.userModel.findOne({ email, active: false });

    if (dUser) {
      if (
        !dUser.active &&
        dUser.userType === UserTypeEnum.VENUE &&
        dUser.accountStatus === 'AWAITING_APPROVAL'
      ) {
        throw new UnauthorizedException(
          'Please Wait upto 24 hours for Admin Approval, When your location is approved by admin. You will be able to login!',
        );
      }

      if (
        !dUser.active &&
        dUser.userType === UserTypeEnum.VENUE &&
        dUser.accountStatus !== '' &&
        dUser.accountStatus !== 'AWAITING_APPROVAL'
      ) {
        throw new UnauthorizedException(
          `Your venue profile is not approved for: ${dUser.accountStatus}`,
        );
      }
    }

    if (dUser && (await dUser.isCorrectPassword(password))) {
      throw new UnauthorizedException('Your Account Is Banned!');
    }

    //Check user is exist or not for this email account! if exist then check pass is correct?
    const user = await this.userModel
      .findOne({ email, active: true })
      .select('+password');

    if (!user || !(await user.isCorrectPassword(password))) {
      throw new UnauthorizedException('Invalid Username and Password');
    }

    if (user) {
      if (user.passwordResetToken) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
      }
      if (user.activationToken) {
        user.activationToken = undefined;
        user.activationTokenExpires = undefined;
        await user.save({ validateBeforeSave: false });
      }

      const token = this.jwtService.sign({
        id: user._id,
        email: user.email,
      });

      // FIXME: Development Code : Delete this block and replace the cookieOptions with cOptions in res.cookie
      let cOptions = cookieOptions;
      if (this.configService.get('NODE_ENV') === 'development') {
        cOptions = {
          ...cOptions,
          domain: context.req.headers.host.split(':')[0],
          secure: false,
        };
      }

      // FIXME: Put origin  to save login credentials
      //console.log(context.req.headers);

      // Set the JWT in a cookie
      context.res.cookie('jwt', token, cOptions);

      return user;
    }

    return null;
  }

  async logout(context: Ctx) {
    // FIXME: Development Code : Delete this block and replace the cookieOptions with cOptions in res.cookie
    let cOptions = cookieOptions;
    if (this.configService.get('NODE_ENV') === 'development') {
      cOptions = {
        ...cOptions,
        domain: 'localhost',
        secure: false,
      };
    }

    context.res.cookie('jwt', '', { ...cOptions, maxAge: 0 });
    return null;
  }

  // This will delete Everything Associated with this user
  async deleteMe(id: string, context: Ctx) {
    const user = await this.userService.getUserById(id);
    if (!user)
      return new NotFoundException('Your ID is not exist in the universe.');

    await this.bookingService.deleteAllAssociatedBookingsByGivenUserIdOnAccountDeletion(
      user._id,
    );
    await this.reviewService.deleteAllAssociatedReviewsByGivenUserIdOnAccountDeletion(
      user._id,
    );
    await this.promotionService.deleteAllAssociatedPromotionsByGivenUserIdOnAccountDeletion(
      user._id,
    );
    await this.reportService.deleteAllAssociatedReportsByGivenUserIdOnAccountDeletion(
      user._id,
    );

    // ADDMORE: EVOKE unsubscribe from products (subscriptions)

    await this.userService.deleteUserById(user._id);

    // FIXME: Development Code : Delete this block and replace the cookieOptions with cOptions in res.cookie
    let cOptions = cookieOptions;
    if (this.configService.get('NODE_ENV') === 'development') {
      cOptions = {
        ...cOptions,
        domain: 'localhost',
        secure: false,
      };
    }

    // Set the JWT in a cookie
    context.res.cookie('jwt', 'deleted', cOptions);

    return null;
  }

  async deleteUserByAdmin(id: string) {
    const user = await this.userService.getUserById(id);

    if (!user) return new NotFoundException('The user is not found.');

    await this.bookingService.deleteAllAssociatedBookingsByGivenUserIdOnAccountDeletion(
      user._id,
    );
    await this.reviewService.deleteAllAssociatedReviewsByGivenUserIdOnAccountDeletion(
      user._id,
    );
    await this.promotionService.deleteAllAssociatedPromotionsByGivenUserIdOnAccountDeletion(
      user._id,
    );
    await this.reportService.deleteAllAssociatedReportsByGivenUserIdOnAccountDeletion(
      user._id,
    );

    // ADDMORE: EVOKE unsubscribe from products (subscriptions)
    await this.userService.deleteUserById(user._id);

    return null;
  }

  // Passport Authentications
  googleLogin(req: any, res: any) {
    const token = this.jwtService.sign({
      id: req.user._id,
      email: req.user.email,
    });

    // FIXME: Development Code : Delete this block and replace the cookieOptions with cOptions in res.cookie
    let cOptions = cookieOptions;
    if (this.configService.get('NODE_ENV') === 'development') {
      cOptions = {
        ...cOptions,
        domain: 'localhost',
        secure: false,
      };
    }

    // Set the JWT in a cookie
    res.cookie('jwt', token, cOptions);

    // CHECK: in PRODUCTION: Change it to a redirection link
    res.status(200).json({
      status: 'success',
      data: {
        user: req.user,
      },
    });
  }
}
