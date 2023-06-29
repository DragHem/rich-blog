import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@server/user/user.service';
import { isMatch } from '@server/utils/hash-pwd';
import { Response } from 'express';
import * as process from 'process';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async register(email: string, password: string, name: string) {
    return this.userService.create(email, password, name);
  }

  async login(email: string, password: string, res: Response) {
    const user = await this.userService.findOne(email);

    if (!user) throw new NotFoundException(`No user found for email: ${email}`);

    const isPasswordValid = await isMatch(password, user.password);

    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

    const token = this.jwtService.sign({ email: user.email });

    return res
      .cookie('jwt', token, {
        secure: true,
        domain: process.env.COOKIE_DOMAIN,
        httpOnly: true,
      })
      .status(200)
      .json({ status: 'ok' });
  }

  logout(res: Response) {
    return res
      .cookie('jwt', '', {
        secure: false,
        domain: 'localhost',
        httpOnly: true,
      })
      .status(200)
      .json({ status: 'ok' });
  }
}
