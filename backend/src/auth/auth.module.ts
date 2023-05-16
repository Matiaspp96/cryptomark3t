import { Module } from '@nestjs/common';
import { AuthService } from '../auth/auth/auth.service';
import { LocalStrategy } from '../auth/local/local.strategy';
import { JwtStrategy } from "../auth/jwt/jwt.strategy";
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/authController';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY', // Use a better secret key or load it from environment variables
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
