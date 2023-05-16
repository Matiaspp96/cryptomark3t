import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(name: string, password: string): Promise<any> {
    console.log(`AuthService: validating ${name}, ${password}`);
    const user = await this.userService.findByUsername(name);
console.log(user, name)
if (user && (password === user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { name: user.name, sub: user.userId };
    console.log(1111)
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
