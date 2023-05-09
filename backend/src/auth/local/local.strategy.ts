import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'name' }); // Cambia 'username' a 'name'
  }

  async validate(name: string, password: string): Promise<any> {
    console.log('LocalStrategy: validate');
    const user = await this.authService.validateUser(name, password);
    if (!user) {
      console.log('LocalStrategy: UnauthorizedException');
      throw new UnauthorizedException();
    }
    return user;
  }
}
