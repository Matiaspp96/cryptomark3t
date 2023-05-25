import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    validateUser(name: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: any;
    }>;
}
