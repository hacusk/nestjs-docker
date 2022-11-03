import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'apiKey',
) {
  constructor(private authService: AuthService) {
    super({ header: 'x-api-key', prefix: '' }, true, async (apiKey, done) => {
      const userInfo = await this.authService.getUserInfo(apiKey);
      if (userInfo) {
        done(null, true);
      }
      done(new UnauthorizedException(), null);
    });
  }
}
