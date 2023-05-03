import { createSlice } from "@reduxjs/toolkit";







export const LabelSlice = createSlice({
    name: 'Label',
    initialState: {
        Labels: [],
        loading: false,

    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder

    }
})


export default LabelSlice.reducer