import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountEntity } from './account.entity';

import { AuthService } from './auth.service';
import { AccountDto } from './dto/account.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() accountDto: AccountDto): Promise<AccountEntity> {
    return this.authService.signup(accountDto);
  }

  @Get('signin')
  signIn(@Body() accountDto: AccountDto): Promise<AccountEntity> {
    return this.authService.signin(accountDto);
  }
}
