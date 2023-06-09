import { Product } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

interface initialCartProps {
    cart: Product[],
}

const cartFromLocalStorage = window.localStorage.getItem('cart');

export const initialCart: initialCartProps = {
    cart: cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : [],
};

export const updateLocalStorage = (state: Product[]) => {
    window.localStorage.setItem('cart', JSON.stringify(state))
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCart,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            if (state.cart.find(item => item.id === product.id)) {
                return state;
            }
            const newState: Product[] = [...state.cart, product];
            updateLocalStorage(newState)
            return { ...state, cart: newState }
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            const newState: Product[] = state.cart.filter(item => item.id !== productId);
            updateLocalStorage(newState)
            return { ...state, cart: newState }
        },
        removeAllCart: (state) => {
            const newState: Product[] = [];
            updateLocalStorage(newState)
            return { ...state, cart: newState }
        },
        updateProductQuantity: (state, action) => {
            const { product, amount } = action.payload;
            const newState: Product[] = state.cart.map(item => {
                if (item.id === product.id) {
                    return { ...item, quantity: amount }
                }
                return item;
            });
            updateLocalStorage(newState)
            return { ...state, cart: newState }
        }
    }
});

export const {
    addToCart,
    removeFromCart,
    updateProductQuantity,
    removeAllCart
} = cartSlice.actions;

export default cartSlice.reducer;