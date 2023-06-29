import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@server/prisma/prisma.service';
import { CreatePostDto } from '@server/post/dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  async create(post: CreatePostDto) {
    return await this.prismaService.post.create({
      data: post,
    });
  }

  async getPost(id: number) {
    return this.prismaService.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });
  }

  async changeVisibility(id: number) {
    const post = await this.prismaService.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    await this.prismaService.post.update({
      where: {
        id,
      },
      data: {
        published: !post.published,
      },
    });
  }
}
