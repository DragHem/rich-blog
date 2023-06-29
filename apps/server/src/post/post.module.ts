import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from '@server/prisma/prisma.service';
import { UserService } from '@server/user/user.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService, UserService],
})
export class PostModule {}
