import { createSlice } from "@reduxjs/toolkit";
import {
  addSubCategory,
  getAllInCats,
  getAllSubCats,
  removeSubCat,
} from "./Thunks.js";

export const SubCategorySlice = createSlice({
  name: "SubCategory",
  initialState: {
    subCats: [],
    loading: false,
    errorCode: "",
    catSubCats: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSubCats.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllSubCats.fulfilled, (state, action) => {
        state.subCats = action.payload;
        state.loading = false;
      })
      // GET ALL SUBCATEGORY
      .addCase(getAllSubCats.rejected, (state, action) => {
        state.errorCode = action.error;
        state.loading = false;
      })
      .addCase(getAllInCats.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllInCats.fulfilled, (state, action) => {
        state.catSubCats = action.payload;
        state.loading = false;
      })
      // GET ALL SUBCATS IN ACTIVE CATEGORY
      .addCase(getAllInCats.rejected, (state, action) => {
        state.errorCode = action.error;
        state.loading = false;
      })
      .addCase(addSubCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addSubCategory.fulfilled, (state, action) => {
        state.catSubCats.push(action.payload);
        state.loading = false;
      })
      .addCase(addSubCategory.rejected, (state, action) => {
        state.errorCode = action.error;
        state.loading = false;
      })
      //   REMOVE SUBCATEGORY
      .addCase(removeSubCat.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(removeSubCat.fulfilled, (state, action) => {
        state.catSubCats = state.catSubCats.filter(
          (s) => s._id != action.payload._id
        );
        state.loading = false;
      })
      .addCase(removeSubCat.rejected, (state, action) => {
        state.errorCode = action.error;
        state.loading = false;
      });
  },
});

export default SubCategorySlice.reducer;
