import { IsString, MaxLength, MinLength } from 'class-validator';

export class AccountDto {
  @IsString()
  @MinLength(4)
  @MaxLength(10)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  // you can set password-policy with following expression
  // @Matches(/hoge/)
  password: string;
}
