
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createUser() {
    const user = new User();
    user.username = 'test_user';
    user.email = 'test@example.com';
    user.password_hash = 'hashed_password';

    const product = new Product();
    product.name = 'Test Product';
    // product.description = 'A test product';
    // product.price = 10;
    // product.stock = 100;
    // product.user = user;

    await this.productRepository.save(product);

    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find({ relations: ['products'] });
  }
}
