import { createSlice } from "@reduxjs/toolkit";

import { createAccount, getAccount, login, logout, deleteAccount, getAllUsers } from "./thunks";



export const AccountSlice = createSlice({
    name: 'Account',
    initialState: {
        account: {},
        loading: true,
        errorCodes: '',
        accessToken: '',
        users: []

    },
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            // CREATE ACCOUNT
            // GET ACCOUNT
            .addCase(getAccount.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAccount.fulfilled, (state, action) => {
                state.account = action.payload
                state.accessToken = action.payload.accessToken
                state.loading = false
            })
            .addCase(getAccount.rejected, (state, action) => {
                state.errorCodes = action.error
                state.loading = true
            })
            // login
            .addCase(login.pending, (state, action) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.account = action.payload
                state.accessToken = action.payload.accessToken
                localStorage.setItem("token", action.payload.accessToken);
                state.loading = false
            })
            .addCase(login.rejected, (state, action) => {
                state.errorCodes = action.error
                state.loading = true
            })
            // LOG OUT
            .addCase(logout.pending, (state, action) => {
                state.loading = true
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.account = {}
                state.accessToken = ''
                state.loading = false
            })
            .addCase(logout.rejected, (state, action) => {
                state.errorCodes = action.error
                state.loading = true
            })
            .addCase(getAllUsers.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.users = action.payload
                state.loading = false
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.errorCodes = action.error
                state.loading = true
            })

    }
})
export default AccountSlice.reducer