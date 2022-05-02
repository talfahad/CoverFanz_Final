/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Req, Res, UseGuards, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('auth/google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req: any) {
    console.log('Initiating process....');
  }

  @Get('auth/google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req: any, @Res() res: any) {
    return this.authService.googleLogin(req, res);
  }
}
