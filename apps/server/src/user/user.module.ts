import { Module } from '@nestjs/common';
import { UserController } from '@server/user/user.controller';
import { UserService } from '@server/user/user.service';
import { PrismaService } from '@server/prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
