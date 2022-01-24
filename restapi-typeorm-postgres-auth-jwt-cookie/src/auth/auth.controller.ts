import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { CookieJwtAuthGuard } from './cookie-jwt-auth.guard';
import { GetAccount } from './account.decorator';
import { Account } from './account.interface';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<Account> {
    return this.authService.signUp(signUpDto);
  }

  @Get('signin')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Account> {
    const { access_token, account } = await this.authService.signIn(signInDto);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      // secure: true, // Please uncomment when production env
    });
    return account;
  }

  @Get('status')
  @UseGuards(CookieJwtAuthGuard)
  status(@GetAccount() account: Account) {
    return {
      status: 'ok',
      ...account,
    };
  }
}
