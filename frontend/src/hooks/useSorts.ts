import { Product } from "@/models"
import { SortBy } from "@/models/sort.model"
import { AppStore } from "@/redux/store"
import { useSelector } from "react-redux"

export function useSorts() {
    const { filter } = useSelector((store: AppStore) => store.products)

    const sortProducts = (products: Product[]) => {
        return products.sort((a, b) => {
            if (filter.sort === SortBy.LOWEST) {
                if (a.price && b.price) {
                    console.log(a.price, b.price)
                    return a.price > b.price ? 1 : -1
                }
            } else if (filter.sort === SortBy.HIGHEST) {
                if (a.price && b.price) {
                    return a.price < b.price ? 1 : -1
                }
            } else if (filter.sort === SortBy.TOP_RATED) {
                if (a.rating && b.rating) {
                    return a.rating < b.rating ? 1 : -1
                }
            } else {
                if (a.createdAt && b.createdAt) {
                    return a.createdAt < b.createdAt ? 1 : -1
                }
            }
            return 0
        })
    }

    return { sortProducts }
}