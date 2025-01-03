import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as a2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new user. The method checks if email (unique value) already exists in the db,
   * if exists throw `ConfictException`.
   * Otherwise, it hashes password using Argon2id and creates a new record in the db.
   *
   * @param {CreateUserDto} createUserDto
   * @returns {Promise<User>}
   * @throws {ConflictException}
   */

  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
    if (existingUser) {
      throw new ConflictException('Email is already taken.');
    }
    const passwordHash = await a2.hash(createUserDto.password);

    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: passwordHash,
      },
    });
  }
}
