import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username, password): Promise<any> {
    const user = await this.userService.findOne(username);
    if (!user) throw new ForbiddenException('Bad Request! User not found.');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ForbiddenException('Bad Request! Wrong password.');
    delete user.password;
    return user;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload, {
      secret: 'secretKey',
    });
    return token;
  }
}
