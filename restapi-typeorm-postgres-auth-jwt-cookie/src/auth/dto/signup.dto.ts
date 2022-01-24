import { IsEmail } from 'class-validator';
import { SignInDto } from './signin.dto';

export class SignUpDto extends SignInDto {
  @IsEmail()
  email: string;
}
