export declare const abi: ({
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
    name?: undefined;
    outputs?: undefined;
} | {
    anonymous: boolean;
    inputs: ({
        indexed: boolean;
        internalType: string;
        name: string;
        type: string;
        components?: undefined;
    } | {
        components: {
            internalType: string;
            name: string;
            type: string;
        }[];
        indexed: boolean;
        internalType: string;
        name: string;
        type: string;
    })[];
    name: string;
    type: string;
    stateMutability?: undefined;
    outputs?: undefined;
} | {
    inputs: ({
        internalType: string;
        name: string;
        type: string;
        components?: undefined;
    } | {
        components: {
            internalType: string;
            name: string;
            type: string;
        }[];
        internalType: string;
        name: string;
        type: string;
    })[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
})[];
export declare const products: {
    id: number;
    name: string;
    description: string;
    price: number;
    rating: number;
    stock: number;
    seller: string;
    category: string;
    thumbnail: string;
    images: string[];
    isSold: boolean;
}[];
