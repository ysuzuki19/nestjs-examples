import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AccountEntity } from './account.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthCred } from './auth-token.interface';
import { AccountDto } from './dto/account.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() accountDto: AccountDto): Promise<AccountEntity> {
    return this.authService.signup(accountDto);
  }

  @Get('signin')
  signIn(@Body() accountDto: AccountDto): Promise<AuthCred> {
    return this.authService.signin(accountDto);
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status() {
    return {
      status: 'ok',
    };
  }
}
