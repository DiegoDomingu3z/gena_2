import { createSlice } from "@reduxjs/toolkit";
import { createDepartment, getDepartments, getLeads, getUsersInDepartment } from "./Thunks";
import { createAccount } from "../Account/thunks";





export const DepartmentSlice = createSlice({
    name: 'Department',
    initialState: {
        departments: [],
        loading: false,
        leads: [],
        users: []
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
            // create department
            .addCase(createDepartment.pending, (state, action) => {
                state.loading = true
            })
            .addCase(createDepartment.fulfilled, (state, action) => {
                state.departments.push(action.payload)
                state.loading = false
            })
            .addCase(createDepartment.rejected, (state, action) => {
                state.loading = false
            })
            // get users in department
            .addCase(getUsersInDepartment.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getUsersInDepartment.fulfilled, (state, action) => {
                state.users = action.payload
                state.loading = false
            })
            .addCase(getUsersInDepartment.rejected, (state, action) => {
                state.loading = false
            })
            .addCase(createAccount.pending, (state, action) => {
                state.loading = true
            })
            .addCase(createAccount.fulfilled, (state, action) => {
                state.users.push(action.payload)
                state.loading = false
            })
            .addCase(createAccount.rejected, (state, action) => {
                state.errorCodes = action.error
                state.loading = false

            })
    }
})


export default DepartmentSlice.reducer