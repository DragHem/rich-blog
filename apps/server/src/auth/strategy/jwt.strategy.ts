import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '@server/user/user.service';
import { Request } from 'express';
import * as process from 'process';

export interface Jwt {
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: process.env.JWT_SECURE_KEY,
    });
  }

  async validate(payload: Jwt) {
    const user = await this.usersService.findOne(payload.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'jwt' in req.cookies) {
      return req.cookies.jwt;
    }
    return null;
  }
}
