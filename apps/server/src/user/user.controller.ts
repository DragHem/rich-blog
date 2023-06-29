import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '@server/auth/jwt-auth.guard';
import { Request } from 'express';
import { UserService } from '@server/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Jwt } from '@server/auth/strategy/jwt.strategy';
import { RoleGuard } from '@server/guards/role.guard';
import { Role } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard(Role.USER))
  @UseInterceptors(ClassSerializerInterceptor)
  getUser(@Req() req: Request) {
    const { email } = this.jwtService.decode(req.cookies.jwt) as Jwt;

    return this.userService.getUserData(email);
  }
}
