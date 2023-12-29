import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axiosService";

export const getFilterData = createAsyncThunk(
    "filtered/data",
    async ({query}) => {
        try {
            console.log(query)
            const data = await api.get(`/api/export/label-defects?${query}`).then((res) => res.data)
            console.log(data, "THIS IS THE DAT")
            return data
        } catch (error) {
            console.log(error)
            return error
        }
    }
)