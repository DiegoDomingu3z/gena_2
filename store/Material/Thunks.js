import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axiosService";

export const getMaterials = createAsyncThunk(
    'materials/get',
    async (token) => {
        try {
            console.log(token)
            const res = await api.get('api/materials/getall', {
                headers: {
                    Authorization: token
                }
            })
                .then((res) => res.data)
            console.log(res)
            return res
        } catch (error) {
            throw error
        }
    }
)