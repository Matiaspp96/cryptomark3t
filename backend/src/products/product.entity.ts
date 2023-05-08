import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
    price: number;
    description: string;
    save(newProduct: Product): Product | PromiseLike<Product> {
        throw new Error('Method not implemented.');
    }
  @PrimaryGeneratedColumn()
  id: number;
    name: string;
    user: any;

  // Resto de las columnas aquí
}
