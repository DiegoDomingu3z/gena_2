import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "./Thunk";



export const CategorySlice = createSlice({
    name: 'Category',
    initialState: {
        categories: [],
        loading: false,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = action.payload
                state.loading = false
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.loading = false
            })
    }
})

export default CategorySlice.reducer