import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<UserEntity> {
    const { name, bio } = createUserInput;
    const user = this.userRepository.create({
      name,
      bio,
    });
    try {
      return await this.userRepository.save(user);
    } catch (err) {
      switch (err.code) {
        case '23505':
          throw new ConflictException(`user '${name}' already exist`);
        default:
          throw new ForbiddenException('unhandled error');
      }
    }
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(name: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ name });
    if (!user) {
      throw new NotFoundException(`user ${name} not found`);
    }
    return user;
  }

  async update(updateUserInput: UpdateUserInput): Promise<UserEntity> {
    const { name, bio } = updateUserInput;
    const user = await this.findOne(name);
    user.bio = bio;
    return this.userRepository.save(user);
  }

  async remove(name: string): Promise<boolean> {
    const user = await this.findOne(name);
    const deleted = await this.userRepository.delete(user);
    return deleted ? true : false;
  }
}
