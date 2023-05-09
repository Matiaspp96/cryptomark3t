import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.authGuard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
//   @UseGuards(JwtAuthGuard)
 @Get()
 async getAllUsers(): Promise<User[]> {
    return await this.usersService.findAll();
}
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

}
