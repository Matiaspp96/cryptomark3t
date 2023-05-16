import { products } from "@/__mocks__";
import { categories } from "@/__mocks__/categories.mock";
import { User } from "@/models";
import { Product } from "@/models/product.model";
import { loadAbort } from "@/utilities/loadAbort-axios.utility";
import axios from "axios";
import { Client } from "wagmi";

interface GetProductsApi {
    data: Partial<Product>[];
    controller: AbortController;
}

interface GetCategoriesApi {
    data: string[];
    controller: AbortController;
}

interface PostUserApi {
    call: Promise<User>;
    controller: AbortController;
}


const API_URL = import.meta.env.VITE_API_URL as string;

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

export const postUserApi = async (user: Partial<User>): Promise<PostUserApi> => {
    const controller = loadAbort();
    return {
        call: axios.post(`${API_URL}/users`, user, {
            signal: controller.signal, headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
            }
        }), controller
    };
    // return { data: user, controller };
}

export const getDirectionApi = async (lat: number, lng: number) =>
    axios
        .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${import.meta.env.VITE_MAPBOX_TOKEN
            }`
        )
        .then(res => res.data);