import { configureStore } from '@reduxjs/toolkit';
import { userSlice, productsSlice, categoriesSlice, cartSlice } from './states';

export interface AppStore {
    user: ReturnType<typeof userSlice>;
    products: ReturnType<typeof productsSlice>;
    categories: ReturnType<typeof categoriesSlice>;
    cart: ReturnType<typeof cartSlice>;
}

export default configureStore<AppStore>({
    reducer: {
        user: userSlice,
        products: productsSlice,
        categories: categoriesSlice,
        cart: cartSlice,
    },
});