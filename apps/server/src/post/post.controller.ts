import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from '@server/post/dto/create-post.dto';
import { RoleGuard } from '@server/guards/role.guard';
import { Role } from '@prisma/client';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/:id')
  getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPost(id);
  }

  @Post()
  @UseGuards(RoleGuard(Role.ADMIN))
  createPost(@Body() post: CreatePostDto) {
    return this.postService.create(post);
  }

  @Patch('/:id')
  @UseGuards(RoleGuard(Role.ADMIN))
  @HttpCode(204)
  changeVisibility(@Param('id', ParseIntPipe) id: number) {
    return this.postService.changeVisibility(id);
  }
}
