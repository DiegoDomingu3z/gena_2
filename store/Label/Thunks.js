import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axiosService";
import { useSelector } from "react-redux";
import { headers } from "../../next.config";





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

export const getLabels = createAsyncThunk(
    'label/getLabels',
    async ({ activeCategory, activeSubCategoryId }) => {
        try {
            console.log(activeCategory, "IN THUNK")
            const res = await api.get(`api/upload/get/category/${activeCategory}/subCategory/${activeSubCategoryId}`)
                .then((res) => res.data)
            console.log(res)
            return res
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)

export const searchLabel = createAsyncThunk(
    'label/search',
    async (data) => {
        try {
            console.log(data, 'search by')
            const res = await api.get(`/api/upload/search?q=${data}`,)
                .then((res) => res.data)
            console.log(res)
            return res
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)

export const findLabelFields = createAsyncThunk(
    'field/label',
    async (formData) => {
        try {
            console.log(formData)
            const res = await api.post(`api/upload/find-pdf-fields`, formData)
                .then((res) => res.data)
            console.log(res)
            return res
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)

export const getLabelById = createAsyncThunk(
    'label/byId',
    async (id) => {
        try {
            const res = await api.get(`api/upload/label/byId/${id}`)
                .then((res) => res.data)
            return res
        } catch (error) {
            console.log(error)
        }
    }
)

export const removeLabel = createAsyncThunk(
    'label/remove',
    async ({ id, token }) => {
        try {
            const res = await api.delete(`api/upload/label/delete/${id}`, {
                headers: {
                    Authorization: token,
                }
            })
                .then((res) => res.data)
            return res
        } catch (error) {
            console.log(error)
        }
    }
)




// export const getLabelsToUpdate = createAsyncThunk(
//     'labels/fetchForUpdate',
//     async(orderId) => {
//         try {
//            const res = await api.get('')
//         } catch (error) {
//             console.log(error)
//         }
//     }
// )

// export const updateLabel = createAsyncThunk(
//     'update/order',
//     async ({orderId, labelId}) => {
//         try {
//             console.log(order, "This is the order ID for updating")
//             const res = await api.get(`api/update/${orderId}/label/${labelId}`)
//         } catch (error) {
//             console.log(error)
//         }
//     }
// )