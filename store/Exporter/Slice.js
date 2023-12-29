import { createSlice } from "@reduxjs/toolkit";
import { getFilterData } from "./Thunks";

export const ExporterSlice = createSlice({
    name: "Exporter",
    initialState: {
        activeData: [],
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getFilterData.pending, (state, action) => {
            state.loading = true
        })
        .addCase(getFilterData.fulfilled, (state, action) => {
            state.activeData = action.payload
            state.loading = false
        })
        .addCase(getFilterData.rejected, (state,action) => {
            state.loading = true
        })
        
    }

})


export default ExporterSlice.reducer;