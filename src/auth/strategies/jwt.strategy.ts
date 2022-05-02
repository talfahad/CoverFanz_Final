import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { get } from 'lodash';
import { Request } from 'express';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => get(req, 'cookies.jwt'),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    validationPayload: {
      id: string;
      email: string;
      iat: number;
    },
  ): Promise<User | null> {
    const user = await this.userService.getUserById(validationPayload.id);
    if (user?.changePasswordAfter(validationPayload.iat)) return null;

    return user;
  }
}
