import { createSlice } from "@reduxjs/toolkit";
import { getAllSubCats } from "./Thunks.js"







export const SubCategorySlice = createSlice({
    name: 'SubCategory',
    initialState: {
        subCats: [],
        loading: false,
        errorCode: ''
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllSubCats.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAllSubCats.fulfilled, (state, action) => {
                state.subCats = action.payload
                state.loading = false
            })
            .addCase(getAllSubCats.rejected, (state, action) => {
                state.errorCode = action.error
                state.loading = false
            })
    }
})

export default SubCategorySlice.reducer