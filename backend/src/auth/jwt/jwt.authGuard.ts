import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor() {
        super();
        console.log('JwtAuthGuard: constructor');
      }
      canActivate(context: ExecutionContext) {
        console.log('jwt: canActivate');
        const result = super.canActivate(context);
        console.log('jwt: canActivate result', result);
        return result;
      }
}
