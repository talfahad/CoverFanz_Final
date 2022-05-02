import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { UserDocument } from '../../user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../user/user.schema';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_SECRET'),
      callbackURL: '/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const { emails, displayName, id } = profile;
    const userEmail = emails[0].value;
    const newUser = {
      email: userEmail,
      name: displayName,
      googleId: id,
      socialAccount: true,
      password: 'nickVirus',
    };

    try {
      let user = await this.userModel.findOne({ email: userEmail });

      if (user && user.socialAccount && id === user.googleId) {
        if (!user.active) {
          return done(null, false, {
            message: 'Your Account on this site is banned.',
            statusCode: 401,
          });
        }
        return done(null, user);
      } else if (user && !user.socialAccount) {
        return done(null, false, {
          message:
            'This email is associated with (sign in with email and password) login method on this platform. If Forgot please try to reset it then login.',
          statusCode: 409,
        });
      } else {
        try {
          user = await this.userModel.create(newUser);
          user.password = undefined;
          await user.save({ validateBeforeSave: false });
          user.passwordChangedAt = undefined;
          await user.save({ validateBeforeSave: false });
          return done(null, user);
        } catch (err) {
          return done(null, false, {
            message:
              'Some Unknown Error Occured, Try Diffrent Login Method! 😒',
            statusCode: 401,
          });
        }
      }
    } catch (err) {
      return done(null, false, {
        message: 'Some Unknown Error Occured, Try Diffrent Login Method!',
        statusCode: 401,
      });
    }
  }
}
