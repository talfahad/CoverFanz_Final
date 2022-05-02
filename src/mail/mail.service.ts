import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, BadGatewayException } from '@nestjs/common';
import { User } from 'src/user/user.schema';
import { Logger } from '@nestjs/common';

@Injectable()
export class MailService {
  private logger = new Logger('MailService');

  private contextObj = {
    companyName: 'CoverFanz',
    siteContactNum: '+13XXXXXXXXXXX',
    siteContactEmail: 'example@gmail.com',
    siteContactTime: 'Monday-Friday, 8.00AM - 6.00PM EST',
    siteURL: 'https://www.coverfanz.com',
    siteLogoURL: 'https://i.ibb.co/VYyZqRr/webanion-main-logo-color-black.png',
    facebookProfileId: 'coverfanz',
    twitterProfileId: 'coverfanz',
    instagramProfileId: 'coverfanz',
    youtubeChannelId: '',
    yearNow: new Date().getFullYear(),
    unsubscribeCallbackURL: 'https://www.coverfanz.com/unsubscribe',
    companyLocation: 'Address is here',
  };

  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `http://localhost:3000/auth/activateUser?token=${token}`;

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Confirm your Email',
        template: './confirmationEmail',
        context: {
          userName: user.name,
          userEmail: user.email,
          url,
          ...this.contextObj,
        },
      });
    } catch (err) {
      this.logger.error(err);
      throw new BadGatewayException('Error Confirmation Email Sending.');
    }
  }

  async sendPasswordResetToken(user: User, token: string) {
    const url = `http://localhost:3000/auth/passwordReset?token=${token}`;

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Reset your Password',
        template: './forgotPassword',
        context: {
          userName: user.name,
          userEmail: user.email,
          url,
          ...this.contextObj,
        },
      });
    } catch (err) {
      this.logger.error(err);
      throw new BadGatewayException('Error Reset Email Sending.');
    }
  }

  async sendPasswordResetSuccess(user: User) {
    const url = `http://localhost:3000/`;

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Password Reset Success',
        template: './resetSuccess',
        context: {
          userName: user.name,
          userEmail: user.email,
          url,
          ...this.contextObj,
        },
      });
    } catch (err) {
      this.logger.error(err);
    }
  }

  async sendWelcome(user: User) {
    const url = `http://localhost:3000/`;

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Account Activation Success',
        template: './welcome',
        context: {
          userName: user.name,
          userEmail: user.email,
          url,
          ...this.contextObj,
        },
      });
    } catch (err) {
      this.logger.error(err);
    }
  }

  async sendPasswordChangedSuccess(user: User) {
    const url = `http://localhost:4000/`;

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Password Changed Success',
        template: './passwordChanged',
        context: {
          userName: user.name,
          userEmail: user.email,
          url,
          ...this.contextObj,
        },
      });
    } catch (err) {
      this.logger.error(err);
    }
  }
}
