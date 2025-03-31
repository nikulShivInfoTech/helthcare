import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import * as dotenv from 'dotenv';
import { UserRoles } from 'src/libs/utility/constants/enums';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'jwtsecret',
    });
  }

  async validate(payload: any) {
    if (payload.role !== UserRoles.USER) {
      return null;
    }
    return {
      id: payload.id,
      email: payload.email,
      role: UserRoles.USER,
    };
  }
}
