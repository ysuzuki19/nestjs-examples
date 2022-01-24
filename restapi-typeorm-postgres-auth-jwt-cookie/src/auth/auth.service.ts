import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { AccountEntity } from './account.entity';
import { Account } from './account.interface';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  private readonly salt = 10; // example value
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    private readonly jwtService: JwtService,
  ) {}

  prunePassword(account: AccountEntity) {
    return {
      id: account.id,
      username: account.username,
    };
  }

  async signUp(signUpDto: SignUpDto): Promise<Account> {
    const { username, password } = signUpDto;
    return this.accountRepository
      .save({
        username,
        password: await bcrypt.hash(password, this.salt),
      })
      .then((account) => this.prunePassword(account))
      .catch((e) => {
        switch (e.code) {
          case '23505':
            throw new ConflictException(`user ${username} already exist`);
          default:
            throw new BadRequestException();
        }
      });
  }

  async signIn(signInDto: SignInDto) {
    const { username, password } = signInDto;
    const account = await this.accountRepository.findOne({
      username,
    });

    if (account && (await bcrypt.compare(password, account.password))) {
      const payload = this.prunePassword(account);
      return {
        access_token: this.jwtService.sign(payload),
        account: payload,
      };
    }

    throw new UnauthorizedException();
  }

  async validateUser(username: string, password: string): Promise<Account> {
    const user = await this.accountRepository.findOne({ username });
    if (user && user.password === password) {
      return this.prunePassword(user);
    }
    throw new UnauthorizedException();
  }
}
