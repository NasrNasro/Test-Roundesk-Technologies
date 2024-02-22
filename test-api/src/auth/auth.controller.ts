import { AuthService } from './auth.service';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-passport/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  login(@Request() req) {
    return this.authService.login(req.user);
  }
}
