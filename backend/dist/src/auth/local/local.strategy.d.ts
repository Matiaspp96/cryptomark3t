import { ExecutionContext } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    canActivate(context: ExecutionContext): any;
    validate(username: string, password: string): Promise<any>;
}
export {};
