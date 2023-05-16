import { Controller, Request, Req, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../local/local.authGuard';
import { JwtAuthGuard } from '../jwt/jwt.authGuard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    console.log('AuthController: login');
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
