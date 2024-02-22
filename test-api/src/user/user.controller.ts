import { UserService } from './user.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserCreateDto } from './dto/userCreate.dto';
import { User } from './entities/user.entity';
import { GetCurrentUserId } from 'src/common/Decorators/get-current-user.decorator';
import { JwtAuthGuard } from 'src/common/Guards/jwt-auth.guard';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/sign-up')
  createUser(@Body() userDto: UserCreateDto): Promise<User> {
    return this.userService.createUser(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('current')
  getCurrentUser(@GetCurrentUserId() id: number) {
    return this.userService.getCurrentUser(id);
  }
}
