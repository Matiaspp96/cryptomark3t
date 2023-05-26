import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
// import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {console.log('AuthService: constructor')}

  async validateUser(name: string, password: string): Promise<any> {
    console.log(`AuthService: validateUser called with ${name}, ${password}`);
    const user = await this.userService.findByUsername(name);
    console.log('AuthService: User from findByUsername:', user);
    if (user && (password === user.password)) {
      console.log('AuthService: User validated:', user);
      return user;
    }
    console.log('AuthService: User validation failed');
    return null;
  }

  async login(user: any) {
    console.log('AuthService: login called with', user);
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  
}


