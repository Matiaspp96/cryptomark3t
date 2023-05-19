import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'name' }); 
    console.log("constructor")
  }


  canActivate(context: ExecutionContext) {
    console.log('LocalAuthGuard: canActivate');
   
    const result =  super.canActivate(context);
    console.log('LocalAuthGuard: canActivate result', result);
    return result;
  }


  async validate(username: string, password: string): Promise<any> {
    console.log('LocalStrategy: validate called with ', username, password);
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      console.log('LocalStrategy: UnauthorizedException');
      throw new UnauthorizedException();
    }
    console.log('LocalStrategy: User validated', user);
    return user;
  }
}

