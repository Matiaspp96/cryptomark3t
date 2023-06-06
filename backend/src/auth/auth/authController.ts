import { Controller, Request, Req, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../local/local.authGuard';
import { JwtAuthGuard } from '../jwt/jwt.authGuard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {console.log("auth")}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log('AuthController: login');
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('register')
    registerUser(@Body() userRegister){
    console.log( userRegister )  
  }

}
