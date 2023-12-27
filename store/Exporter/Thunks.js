import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axiosService";

export const getFilteredData = createAsyncThunk(
    "filtered/data",
    async ({query}) => {
        try {
            const data = api.get(`api/export?${query}`)
            console.log(data)
        } catch (error) {
            console.log(error)
            return error
        }
    }
)