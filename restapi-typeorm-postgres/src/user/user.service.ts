import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, bio } = createUserDto;
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

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(name: string): Promise<User> {
    const user = await this.userRepository.findOne({ name });
    if (!user) {
      throw new NotFoundException(`user ${name} not found`);
    }
    return user;
  }

  async update(name: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { bio } = updateUserDto;
    const user = await this.findOne(name);
    user.bio = bio;
    return this.userRepository.save(user);
  }

  async remove(name: string) {
    const user = await this.findOne(name);
    return this.userRepository.delete(user);
  }
}
