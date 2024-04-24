import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, getUsers } from "./Thunks";

export const UserSlice = createSlice({
    name: 'Users',
    initialState: {
        users: [],
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getUsers.pending, (state, action) => {
            state.loading = true
        })
        .addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload
            state.loading = false
        })
        .addCase(getUsers.rejected, (state, action) => {
            console.log("REJECTED")
        })
        .addCase(deleteUser.pending, (state, action) => {
            state.loading = true
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.users = state.users.filter((user) => user._id != action.payload._id)
        })
        .addCase(deleteUser.rejected, (state, action) => {
            console.log("REJECTED")
        })
    }
})

export default UserSlice.reducer;