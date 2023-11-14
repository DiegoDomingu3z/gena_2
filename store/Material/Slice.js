import { createSlice } from "@reduxjs/toolkit";
import { getMaterials, createNewMaterial, updateMaterial } from "./Thunks";

export const MaterialSlice = createSlice({
  name: "Material",
  initialState: {
    materials: [],
    loading: false,
    errorCode: "",
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getMaterials.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMaterials.fulfilled, (state, action) => {
        state.materials = action.payload;
        state.loading = false;
      })
      .addCase(getMaterials.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(createNewMaterial.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createNewMaterial.fulfilled, (state, action) => {
        // state.materials.push(action.payload);
        state.materials = action.payload;
        state.loading = false;
      })
      .addCase(createNewMaterial.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateMaterial.fulfilled, (state, action) => {
        state.materials = action.payload;
        state.loading = false;
      })
      .addCase(updateMaterial.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateMaterial.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default MaterialSlice.reducer;
