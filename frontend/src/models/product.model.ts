import { Transaction, User } from '.';

export type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    isSold: boolean;
    seller: User;
    transactions: Transaction[];
    stateTransaction: string;
}