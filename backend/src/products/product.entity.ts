import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
    // price: number;
    // description: string;
    // save(newProduct: Product): Product | PromiseLike<Product> {
        
    //     return 
    // }
  @PrimaryGeneratedColumn()
  id: number;
    user: any;
    @Column()
    name: string;
  
    @Column()
    description: string;
  
    @Column()
    price: number;
    

}
