import { Prisma } from '@prisma/client';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto implements Prisma.PostCreateInput {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  authorId: number;

  @IsBoolean()
  @IsNotEmpty()
  published: boolean;
}
