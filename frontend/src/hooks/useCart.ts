import { Product } from '@/models';
import { addToCart, removeAllCart, removeFromCart } from '@/redux/states/cart';
import { useDispatch } from 'react-redux';

export const useCart = () => {
    const dispatch = useDispatch();

    const addProduct = async (product: Product) => {
        dispatch(addToCart(product));
    };

    const removeProduct = (productId: number) => {
        dispatch(removeFromCart(productId));
    };

    const resetCart = () => {
        dispatch(removeAllCart());
    };

    return { addProduct, removeProduct, resetCart };
}