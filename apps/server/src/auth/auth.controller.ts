import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '@server/auth/dto/login.dto';
import { RegisterDto } from '@server/auth/dto/register.dto';
import { JwtAuthGuard } from '@server/auth/jwt-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @UseInterceptors(ClassSerializerInterceptor)
  register(@Body() { email, password, name }: RegisterDto) {
    return this.authService.register(email, password, name);
  }

  @Post('/login')
  login(@Body() { email, password }: LoginDto, @Res() res: Response) {
    return this.authService.login(email, password, res);
  }

  @Get('/logout')
  @UseGuards(JwtAuthGuard)
  logout(@Res() res: Response) {
    return this.authService.logout(res);
  }
}
