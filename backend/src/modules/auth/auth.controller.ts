import {
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { BasicGuard } from './basic.guard';
import { UserID } from './user.decorator';
import { TokenService } from '../token/token.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(BasicGuard)
  async login(
    @UserID() userId: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    const accessToken = this.tokenService.createAccessToken(userId);
    const { value: refreshToken, expirationTime } =
      await this.tokenService.createRefreshToken(userId);

    response.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      // sameSite: 'strict',
      expires: expirationTime,
      path: '/api/auth',
    });

    response.cookie('access-token', accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 5 * 60 * 1000),
    });
    response.cookie('is-logged', true, {
      expires: new Date(Date.now() + 5 * 60 * 1000),
    });
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    if (request.cookies['refresh-token']) {
      await this.tokenService.revokeRefreshToken(
        request.cookies['refresh-token'],
      );
    }
    response.clearCookie('refresh-token');
    response.clearCookie('access-token');
    response.clearCookie('is-logged');
  }

  @Post('refresh-token')
  async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (request.cookies['access-token']) {
      throw new ForbiddenException();
    }
    try {
      const newRefreshToken = await this.tokenService.issueRefreshToken(
        request.cookies['refresh-token'],
      );

      response.cookie('refresh-token', newRefreshToken.value, {
        httpOnly: true,
        // sameSite: 'strict',
        expires: newRefreshToken.expirationTime,
        path: '/api/auth',
      });

      const accessToken = this.tokenService.createAccessToken(
        newRefreshToken.ownerId,
      );

      response.cookie('access-token', accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 60 * 1000),
      });
      response.cookie('is-logged', true, {
        expires: new Date(Date.now() + 5 * 60 * 1000),
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
