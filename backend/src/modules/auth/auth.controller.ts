import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
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
      sameSite: 'strict',
      expires: expirationTime,
      //PRZYPISAC CIASTECZKO DO PATHA refresh-token czy cos takiego
    });

    response.cookie('access-token', accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });
    response.cookie('is-logged', true, {
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });
  }

  @Post('logout')
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
}
