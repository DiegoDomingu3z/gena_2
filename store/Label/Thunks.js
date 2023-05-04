import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axiosService";
import { useSelector } from "react-redux";





export const createLabelInfo = createAsyncThunk(
    'label/createInfo',
    async ({ data, formData }) => {
        try {
            console.log(data)
            console.log(formData, 'files')
            const token = await sessionStorage.getItem('accessToken')
            const res = await api.post(`/api/upload/label/cat/${data.categoryId}/subCat/${data.subCategoryId}`, data, {
                headers: {
                    Authorization: token
                }
            }).then((res) => res.data)
            const res2 = await api.post(`/api/upload/pdf/cat/${data.categoryId}/subCat/${data.subCategoryId}`, formData, {
                headers: {
                    Authorization: token,

                },
                contentType: false,
                processData: false
            })
            console.log(res)
            console.log(res2)
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)
