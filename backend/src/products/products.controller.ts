import {
    Body,
    Controller,
    Get,
    Post,
  } from '@nestjs/common';
  import { CreateProductDto } from './dto/create-product.dto';
  import { ProductsService } from './products.service';
  import { Product } from './product.entity';
  
  @Controller('products')
  export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
  
    @Get()
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll();
  }
    @Post()
    async createProduct(
      @Body() createProductDto: CreateProductDto,
    ): Promise<Product> {
        
      return await this.productsService.createProduct(createProductDto);
    }
  }
  