import { createSlice } from '@reduxjs/toolkit';

interface Category {
    category: string,
}

interface initialCategoriesProps {
    categories: Category[],
    category: Category,
}

export const initialCategories: initialCategoriesProps = {
    categories: [],
    category: {} as Category,
};

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: initialCategories,
    reducers: {
        getCategories: (state, action) => {
            return { ...state, categories: action.payload }
        }
    }
});

export const { getCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;