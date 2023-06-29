import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@server/prisma/prisma.service';
import { hash } from '@server/utils/hash-pwd';
import { UserDto } from '@server/user/dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(
    email: string,
    password: string,
    name: string,
  ): Promise<UserDto> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) throw new HttpException('Conflict', HttpStatus.CONFLICT);

    password = await hash(password);

    const newUser = await this.prisma.user.create({
      data: {
        password,
        name,
        email,
      },
    });

    return new UserDto(newUser);
  }

  async findOne(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getUserData(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    return new UserDto(user);
  }
}
