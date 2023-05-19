// local.authGuard.ts
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
    console.log('LocalAuthGuard: constructor');
  }

 canActivate(context: ExecutionContext) {
    console.log('LocalAuthGuard: canActivate');
    const result = super.canActivate(context);
    console.log('LocalAuthGuard: canActivate result', result);
    return result;
  }
}

