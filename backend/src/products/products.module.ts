import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from '../../multer.config';

@Module({
  imports: [TypeOrmModule.forFeature([Product]),  MulterModule.register(multerConfig)],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
