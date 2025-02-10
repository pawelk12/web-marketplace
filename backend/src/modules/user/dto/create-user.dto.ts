import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(5)
  username: string;

  @IsNotEmpty()
  @MinLength(10)
  password: string;
}
