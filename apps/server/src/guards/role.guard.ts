import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@server/user/user.service';
import { Jwt } from '@server/auth/strategy/jwt.strategy';
import { Role } from '@prisma/client';

export const RoleGuard = (role: Role): any => {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private userService: UserService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const { cookies } = context.switchToHttp().getRequest() as Request;
      const { email } = this.jwtService.decode(cookies.jwt) as Jwt;

      const user = await this.userService.findOne(email);

      if (!user) return false;

      return user.role === role;
    }
  }

  return mixin(RoleGuardMixin);
};
