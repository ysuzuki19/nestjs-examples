import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsString()
  @MinLength(3)
  @Field()
  name: string;

  @IsString()
  @Field()
  bio: string;
}
