import { createSlice } from "@reduxjs/toolkit";
import {
  findLabelFields,
  getLabelById,
  getLabels,
  removeLabel,
  searchLabel,
  updateLabel,
  updateSerialLabel,
} from "./Thunks";

export const LabelSlice = createSlice({
  name: "Label",
  initialState: {
    activeLabels: [],
    loading: false,
    searchedLabels: [],
    labelFields: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLabels.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getLabels.fulfilled, (state, action) => {
        state.activeLabels = action.payload;
        state.loading = false;
      })
      .addCase(getLabels.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(searchLabel.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(searchLabel.fulfilled, (state, action) => {
        state.activeLabels = action.payload;
        state.loading = false;
      })
      .addCase(searchLabel.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(findLabelFields.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(findLabelFields.fulfilled, (state, action) => {
        state.labelFields = action.payload;
        state.loading = false;
      })
      .addCase(findLabelFields.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(removeLabel.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(removeLabel.fulfilled, (state, action) => {
        state.activeLabels = state.activeLabels.filter(
          (f) => f._id != action.payload
        );
        state.loading = false;
      })
      .addCase(removeLabel.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateSerialLabel.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateSerialLabel.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateSerialLabel.fulfilled, (state, action) => {
        state.loading = false;
      });
  },
});

export default LabelSlice.reducer;
