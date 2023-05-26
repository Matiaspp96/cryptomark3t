import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { multerConfig } from "../multer.config"
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // O el tipo de base de datos que estés utilizando
      database: "./products.db", // Ruta a tu archivo de base de datos SQLite
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MulterModule.register(multerConfig),
    UsersModule,
    ProductsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
