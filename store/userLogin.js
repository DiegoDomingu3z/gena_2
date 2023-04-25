import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../axiosService";

export const login = createAsyncThunk (
    'currentUser/login',
    async (values) => {
        try {
            console.log("before await")
            const res = await api.post("api/account/login", values)
            console.log(res.data)
            return res.data;
        } catch {
            console.log("bad request")
        }
    }
)


export const currentUser = createSlice({
    name: 'currentUser',
    initialState: {
            userName: "",
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder

        .addCase(login.fulfilled, (state, action) => {
            state.userName = action.payload.userName
            sessionStorage.setItem("userName", currentUser)
        })
    }

})

export default currentUser.reducer