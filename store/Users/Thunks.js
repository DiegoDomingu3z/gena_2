import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axiosService";



export const getUsers = createAsyncThunk(
    "users",
    async () => {
        try {
            const res = await api.get("api/users").then((res) => res.data)
            return res
        } catch (error) {
            console.log(error)
            return error
        }
    }

)