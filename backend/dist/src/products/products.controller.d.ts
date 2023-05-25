/// <reference types="multer" />
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductsService } from "./products.service";
import { Product } from "./product.entity";
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): Promise<Product[]>;
    createProduct(file: Express.Multer.File, body: CreateProductDto): Promise<Product>;
}
