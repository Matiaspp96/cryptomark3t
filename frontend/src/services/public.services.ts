import { Client } from "wagmi";
import { Product } from "@/models/product.model";
import axios from "axios";
import { products } from "@/__mocks__";
import { loadAbort } from "@/utilities/loadAbort-axios.utility";
import { categories } from "@/__mocks__/categories.mock";

interface GetProductsApi {
    data: Partial<Product>[];
    controller: AbortController;
}

interface GetCategoriesApi {
    data: string[];
    controller: AbortController;
}


export const getUserInfo = async (client: Client) => {
    return await client.connectors[0].options.web3AuthInstance.getUserInfo();
}

export const getProductsApi = async (): Promise<GetProductsApi> => {
    const controller = loadAbort();
    // return { call: axios.get<Product>(`/products`, { signal: controller.signal }), controller };
    return { data: products, controller };
}

export const getCategoriesApi = async (): Promise<GetCategoriesApi> => {
    const controller = loadAbort();
    // return { call: axios.get<Product>(`/categories`, { signal: controller.signal }), controller };
    return { data: categories, controller };
}