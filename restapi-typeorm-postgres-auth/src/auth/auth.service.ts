import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { AccountEntity } from './account.entity';
import { AccountDto } from './dto/account.dto';

@Injectable()
export class AuthService {
  private readonly salt = 10; // example value
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  prunePassword(account: AccountEntity) {
    return {
      id: account.id,
      username: account.username,
    };
  }

  async signup(accountDto: AccountDto): Promise<AccountEntity> {
    const { username, password } = accountDto;
    return this.accountRepository
      .save({
        username,
        password: await bcrypt.hash(password, this.salt),
      })
      .then((account) => this.prunePassword(account))
      .catch((e) => {
        switch (e.code) {
          case '23505':
            throw new ConflictException(
              `user ${accountDto.username} already exist`,
            );
          default:
            throw new BadRequestException();
        }
      });
  }

  async signin(accountDto: AccountDto): Promise<AccountEntity> {
    const { username, password } = accountDto;
    const account = await this.accountRepository.findOne({
      username,
    });

    if (account && (await bcrypt.compare(password, account.password))) {
      return this.prunePassword(account);
    }

    throw new UnauthorizedException();
  }
}
