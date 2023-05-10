import { createSlice } from "@reduxjs/toolkit";
import { createDepartment, getDepartments, getLeads } from "./Thunks";





export const DepartmentSlice = createSlice({
    name: 'Department',
    initialState: {
        departments: [],
        loading: false,
        leads: []
    },
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(getDepartments.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getDepartments.fulfilled, (state, action) => {
                state.departments = action.payload
                state.loading = false
            })
            .addCase(getDepartments.rejected, (state, action) => {

                state.loading = false
            })
            .addCase(getLeads.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getLeads.fulfilled, (state, action) => {
                state.leads = action.payload
                state.loading = false
            })
            .addCase(getLeads.rejected, (state, action) => {

                state.loading = false
            })
            .addCase(createDepartment.pending, (state, action) => {
                state.loading = true
            })
            .addCase(createDepartment.fulfilled, (state, action) => {
                state.leads.push(action.payload)
                state.loading = false
            })
            .addCase(createDepartment.rejected, (state, action) => {
                state.loading = false
            })
    }
})


export default DepartmentSlice.reducer