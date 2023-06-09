import { Transaction } from '.';

export type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
    rating: number;
    isSold: boolean;
    seller: string;
    transactions: Transaction[];
    stateTransaction: string;
    image: string;
    images: string[];
    createdAt: Date;
    quantity: number;
    productId: string;
    escrowAddress: string;
}