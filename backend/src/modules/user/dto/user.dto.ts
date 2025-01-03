import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserDto implements User {
  id: number;
  email: string;

  @Exclude()
  password: string;

  @Exclude()
  createdAt: Date;
}
