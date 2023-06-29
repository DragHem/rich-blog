import { User, Role } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserDto implements User {
  @Exclude()
  id: number;

  email: string;

  @Exclude()
  password: string;

  name: string;

  @Exclude()
  role: Role;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
