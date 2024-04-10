import { createSlice } from "@reduxjs/toolkit";
import { getConfig, testEmailConnection, testJiraDomainConnection, updateConfig } from "./Thunks";


export const ConfigurationSlice = createSlice({
    name: "Configuration",
    initialState: {
        configuration: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(updateConfig.pending, (state, action) => {
            console.log("PENDING")
        })
        .addCase(updateConfig.fulfilled, (state, action) => {
           state.configuration =  action.payload
        })
        .addCase(updateConfig.rejected, (state, action) => {
            console.log("REJECTED")
        })
        .addCase(getConfig.pending, (state, action) => {
            console.log("PENDING")
        })
        .addCase(getConfig.fulfilled, (state, action) => {
            state.configuration = action.payload
        })
        .addCase(getConfig.rejected, (state, action) => {
            console.log("REJECTED")
        })
        .addCase(testEmailConnection.pending, (state, action) => {
            console.log("PENDING")
        })
        .addCase(testEmailConnection.fulfilled, (state, action) => {
            state.configuration = action.payload
        })
        .addCase(testEmailConnection.rejected, (state, action) => {
            console.log("REJECTED")
        })
        .addCase(testJiraDomainConnection.pending, (state, action) => {
            console.log("PENDING")
        })
        .addCase(testJiraDomainConnection.fulfilled, (state, action) => {
            state.configuration = action.payload
        })
        .addCase(testJiraDomainConnection.rejected, (state, action) => {
            console.log("REJECTED")
        })

    }
})

export default ConfigurationSlice.reducer;