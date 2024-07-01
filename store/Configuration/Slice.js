import { createSlice } from "@reduxjs/toolkit";
import { getConfig, getCronJobs, testEmailConnection, testJiraDomainConnection, updateConfig, updateCronJob, updateMainPrintAccount } from "./Thunks";


export const ConfigurationSlice = createSlice({
    name: "Configuration",
    initialState: {
        configuration: {},
        crons: []
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
        .addCase(getCronJobs.pending, (state, action) => {
            console.log("Pending")
        })
        .addCase(getCronJobs.fulfilled, (state, action) => {
            state.crons = action.payload
        })
        .addCase(getCronJobs.rejected, (state, action) => {
            console.log("REJECTED")
        })
        .addCase(updateCronJob.pending, (state, action) => {
            console.log("PENDING")
        })
        .addCase(updateCronJob.fulfilled, (state, action) => {
            console.log(state.crons)
            const arr = state.crons.map(cron => {
                if (cron['key'] == action.payload['key']) {
                    return action.payload
                } else {
                    return cron
                }
            })
            state.crons = arr
            console.log(state.crons)
        })
        .addCase(updateCronJob.rejected, (state, action) => {
            console.log("REJECTED")
        })
        .addCase(updateMainPrintAccount.pending, (state, action) => {
            console.log("PENDING")
        })
        .addCase(updateMainPrintAccount.fulfilled, (state, action) => {
            state.configuration = action.payload
        })
        .addCase(updateMainPrintAccount.rejected, (state, action) => {
            console.log("REJECTED")
        })

    }
})

export default ConfigurationSlice.reducer;