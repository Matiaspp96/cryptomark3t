import { Product } from "@/models"
import { AppStore } from "@/redux/store"
import { useSelector } from "react-redux"

export function useFilters() {
    const filters = useSelector((store: AppStore) => store.products.filter)

    const filterProducts = (products: Partial<Product>[]) => {
        return products.filter(product => {
            return (
                product.price && product.price >= filters.minPrice &&
                (
                    filters.category === 'all' ||
                    product.category === filters.category
                )
            )
        })
    }

    return { filters, filterProducts }
}