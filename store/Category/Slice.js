import { createSlice } from "@reduxjs/toolkit";
import {
  addCategory,
  getCategories,
  getCategory,
  removeCategory,
} from "./Thunk";

export const CategorySlice = createSlice({
  name: "Category",
  initialState: {
    categories: [],
    loading: false,
    category: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get all categories
      .addCase(getCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
      })
      // ADD CATEGORY
      .addCase(addCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        console.log(action.payload, "PAYLOAD");
        state.categories.push(action.payload);
        state.loading = false;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
      })
      // REMOVE CATEGORY
      .addCase(removeCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (c) => c._id != action.payload._id
        );
        state.loading = false;
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.loading = false;
      })
      // GET SINGLE CATEGORY
      .addCase(getCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.category = action.payload;
        state.loading = false;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default CategorySlice.reducer;
