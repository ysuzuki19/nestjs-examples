import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserType } from './user.type';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserType])
  users(): Promise<UserType[]> {
    return this.userService.findAll();
  }

  @Query(() => UserType)
  user(@Args('name') name: string): Promise<UserType> {
    return this.userService.findOne(name);
  }

  @Mutation(() => UserType)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserType> {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => UserType)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<UserType> {
    return this.userService.update(updateUserInput);
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('name') name: string): Promise<boolean> {
    return this.userService.remove(name);
  }
}
