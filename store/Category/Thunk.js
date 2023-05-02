import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axiosService";




export const getCategories = createAsyncThunk(
    'category/getall',
    async () => {
        try {
            const res = await api.get('/api/category/all')
                .then((res) => res.data)
            console.log(res, "DATA")
            return res
        } catch (error) {
            throw error
        }
    }
)