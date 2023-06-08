import { searchProducts } from '@/redux/states/products';
import React from 'react';
import { useDispatch } from 'react-redux';

const useSearchProduct = (searchInputRef: React.RefObject<HTMLInputElement>) => {
    const dispatch = useDispatch();

    const searchProduct = () => {
        if (searchInputRef.current) {
            dispatch(searchProducts(searchInputRef.current.value));
            searchInputRef.current.value = '';
            searchInputRef.current.blur();
        }
    }

    return { searchProduct };
};

export default useSearchProduct;