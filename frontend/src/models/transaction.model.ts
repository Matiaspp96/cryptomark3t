import { Product, User } from ".";

export type Transaction = {
    id: number;
    txHash: string;
    buyer: User;
    seller: User;
    product: Product;
    value: number;
    status: string;
    timestamp: Date;
}