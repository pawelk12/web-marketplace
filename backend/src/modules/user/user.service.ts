import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as a2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new user. The method checks if email and username (unique values) already exists in the db,
   * if exists throw `ConfictException`.
   * Otherwise, it hashes password using Argon2id and creates a new record in the db.
   *
   * @param {CreateUserDto} createUserDto
   * @returns {Promise<User>}
   * @throws {ConflictException}
   */

  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: createUserDto.email },
          { username: createUserDto.username },
        ],
      },
    });
    if (existingUser) {
      if (createUserDto.email === existingUser.email) {
        throw new ConflictException('This email is already taken.');
      }
      if (createUserDto.username === existingUser.username) {
        throw new ConflictException('This username is already taken.');
      }
    }
    const passwordHash = await a2.hash(createUserDto.password);

    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        username: createUserDto.username,
        password: passwordHash,
      },
    });
  }
}
