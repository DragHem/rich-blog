import { Module } from '@nestjs/common';
import { AuthModule } from '@server/auth/auth.module';
import { UserModule } from '@server/user/user.module';
import { PostModule } from '@server/post/post.module';

@Module({
  imports: [AuthModule, UserModule, PostModule],
})
export class AppModule {}
