import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
//   findByUsername:any;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
    return newUser;
  }
 async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
  async findByUsername(name: string): Promise<User| undefined>  {
    console.log(`UsersService: finding by name ${name}`); 
    return await this.userRepository.findOne({  where: { name }});
  }
  
}
