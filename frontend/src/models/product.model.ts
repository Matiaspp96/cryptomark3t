import { Transaction, User } from '.';

export type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    sold: boolean;
    owner: User;
    transactions: Transaction[];
    stateTransaction: string;
}