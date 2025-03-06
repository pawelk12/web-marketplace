import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GenerateRefreshToken } from '../../utils/generate-refresh-token';
import { PrismaService } from '../prisma/prisma.service';
import { GenerateHash } from '../../utils/generate-hash';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  createAccessToken(userId: number): string {
    return this.jwtService.sign({ sub: userId }, { expiresIn: '1h' });
  }

  verifyToken(jwtToken: string): { sub: number } {
    return this.jwtService.verify(jwtToken);
  }

  async createRefreshToken(
    userId: number,
  ): Promise<{ value: string; expirationTime: Date; tokenId: string }> {
    const refreshToken = GenerateRefreshToken();
    const expirationTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const refreshTokenHash: string = GenerateHash(refreshToken);
    const createdToken = await this.prisma.refreshToken.create({
      data: {
        userId: userId,
        tokenHash: refreshTokenHash,
        expiresAt: expirationTime,
      },
    });
    return {
      value: refreshToken,
      expirationTime: expirationTime,
      tokenId: createdToken.id,
    };
  }

  async revokeRefreshToken(refreshToken: string) {
    const refreshTokenHash: string = GenerateHash(refreshToken);
    try {
      await this.prisma.refreshToken.delete({
        where: {
          tokenHash: refreshTokenHash,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {}
  }

  async issueRefreshToken(oldRefreshToken: string) {
    const oldRefreshTokenHash: string = GenerateHash(oldRefreshToken);
    const currDate = new Date();
    const oldToken = await this.prisma.refreshToken.delete({
      where: {
        tokenHash: oldRefreshTokenHash,
        expiresAt: { gte: currDate },
      },
    });

    const { tokenId, value, expirationTime } = await this.createRefreshToken(
      oldToken.userId,
    );
    return { tokenId, value, expirationTime, ownerId: oldToken.userId };
  }
}
