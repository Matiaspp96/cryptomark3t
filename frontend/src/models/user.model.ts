import { Product } from ".";

export type User = {
    id: number;
    name: string;
    email: string;
    walletAddress: string;
    phoneNumber: string;
    chainId: number;
    avatar: string;
    products: Product[];
}