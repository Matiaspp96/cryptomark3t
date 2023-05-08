import {
    Body,
    Controller,
    Post,
  } from '@nestjs/common';
  import { CreateProductDto } from './dto/create-product.dto';
  import { ProductsService } from './products.service';
  import { Product } from './product.entity';
  
  @Controller('products')
  export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
  
    @Post()
    async createProduct(
      @Body() createProductDto: CreateProductDto,
    ): Promise<Product> {
        
      return await this.productsService.createProduct(createProductDto);
    }
  }
  