import { configureStore } from '@reduxjs/toolkit';
import { userSlice, productsSlice, categoriesSlice } from './states';

export interface AppStore {
    user: ReturnType<typeof userSlice>;
    products: ReturnType<typeof productsSlice>;
    categories: ReturnType<typeof categoriesSlice>;
}

export default configureStore<AppStore>({
    reducer: {
        user: userSlice,
        products: productsSlice,
        categories: categoriesSlice
    },
});