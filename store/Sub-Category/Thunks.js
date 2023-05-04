import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axiosService";





export const getAllSubCats = createAsyncThunk(
    'subCats/getall',
    async () => {
        try {
            const res = await api.get('/api/subcategory/all')
                .then((res) => res.data)
            console.log(res)
            return res
        } catch (error) {
            throw error
        }
    }
)