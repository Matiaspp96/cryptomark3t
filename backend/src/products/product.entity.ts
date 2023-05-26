import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
    
  @PrimaryGeneratedColumn()
  id: number;
    // user: any;
    @Column()
    name: string;
  
    @Column()
    description: string;
  
    @Column()
    price: number;

    @Column({ }) 
    imageUrl: string;
    
    @Column()
    category: string;

    @Column({ }) 
    seller: string;

    @Column({ }) 
    email: string;

}
