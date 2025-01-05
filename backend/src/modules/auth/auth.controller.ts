import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { BasicGuard } from './basic.guard';
import { UserID } from './user.decorator';
import { TokenService } from '../token/token.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('login')
  @UseGuards(BasicGuard)
  login(
    @UserID() userId: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = this.tokenService.createToken(userId);
    response.cookie('access-token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });
    response.cookie('is-logged', true, {
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access-token');
    response.clearCookie('is-logged');
  }
}
