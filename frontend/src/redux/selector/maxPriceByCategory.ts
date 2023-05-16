import { createSelector } from 'reselect';
import { AppStore } from '../store';
import { Product } from '@/models';

const selectProductList = (store: AppStore) => store.products.products;

export const selectMaxPriceByCategory = createSelector(
    [selectProductList],
    (productList) => {
        const groupedProducts = productList.reduce((acc: { [key: string]: Product[] }, product: Product) => {
            if (!acc[product.category]) {
                acc[product.category] = [];
            }
            acc[product.category].push(product);
            return acc;
        }, {});

        const maxPricesByCategory: { [key: string]: number } = {};

        for (const category in groupedProducts) {
            maxPricesByCategory[category] = groupedProducts[category].reduce(
                (max, product) => Math.max(max, product.price),
                0
            );
        }

        return maxPricesByCategory;
    }
);