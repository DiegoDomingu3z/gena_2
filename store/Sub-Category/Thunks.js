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


export const getAllInCats = createAsyncThunk(
    'subCats/inCats',
    async (categoryId) => {
        try {
            const res = await api.get(`/api/subcategory/incat/${categoryId}`)
                .then((res) => res.data)
            console.log(res)
            return res
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)


export const addSubCategory = createAsyncThunk(
    'subCats/add',
    async ({ values, categoryId, token }) => {
        try {
            const res = await api.post(`/api/subcategory/create/${categoryId}`, values, {
                headers: {
                    Authorization: token
                }
            })
                .then((res) => res.data)
            return res
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)



export const removeSubCat = createAsyncThunk(
    'subCat/remove',
    async ({ id, token }) => {
        try {
            const res = await api.delete(`/api/subcategory/remove/${id}`, {
                headers: {
                    Authorization: token
                }
            })
                .then((res) => res.data)
            return res
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)

