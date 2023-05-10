import { Product } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

interface initialProductsProps {
    products: Product[],
    product: Product,
    loading: boolean,
    error: any,
    filter: any
}

export const initialProducts: initialProductsProps = {
    products: [],
    product: {} as Product,
    loading: false,
    error: null,
    filter: {
        category: 'all',
        minPrice: 0,
        rating: 0,
        sort: 'newest'
    }
};

export const productsSlice = createSlice({
    name: 'products',
    initialState: initialProducts,
    reducers: {
        getProducts: (state, action) => {
            return { ...state, products: action.payload }
        },
        filterProductsByCategory: (state, action) => {
            return { ...state, filter: { ...state.filter, category: action.payload } }
        },
        filterProductsByMinPrice: (state, action) => {
            return { ...state, filter: { ...state.filter, minPrice: action.payload } }
        },
        filterProductsByRating: (state, action) => {
            return { ...state, filter: { ...state.filter, rating: action.payload } }
        },
        sortProductsBy: (state, action) => {
            return { ...state, filter: { ...state.filter, sort: action.payload } }
        },
        getProduct: (state, action) => {
            return { ...state, product: action.payload }
        },
        loading: (state, action) => {
            return { ...state, loading: action.payload }
        },
        error: (state, action) => {
            return { ...state, error: action.payload }
        },
    }
});

export const { getProducts, getProduct, loading, error, filterProductsByCategory, filterProductsByMinPrice, filterProductsByRating, sortProductsBy } = productsSlice.actions;

export default productsSlice.reducer;