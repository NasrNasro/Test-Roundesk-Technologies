import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/userCreate.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    return user;
  }

  async createUser(userDto: UserCreateDto): Promise<User> {
    const foundUser = await this.findOne(userDto.username);
    if (foundUser) {
      throw new BadRequestException('User is already exists!');
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(userDto.password, saltOrRounds);
    userDto.password = hash;
    const user = this.userRepository.create(userDto);
    await this.userRepository.save(user);
    delete user.password;
    return user;
  }

  getCurrentUser(id: number){
    return this.userRepository.findOne({
      where: {
        id
      }
    })
  }
}
