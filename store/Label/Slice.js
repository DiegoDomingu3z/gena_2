import { createSlice } from "@reduxjs/toolkit";
import { getLabels } from "./Thunks";







export const LabelSlice = createSlice({
    name: 'Label',
    initialState: {
        activeLabels: [],
        loading: false,

    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getLabels.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getLabels.fulfilled, (state, action) => {
                state.activeLabels = action.payload
                state.loading = false
            })
            .addCase(getLabels.rejected, (state, action) => {
                state.loading = false
            })

    }
})


export default LabelSlice.reducer