import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axiosService";

export const getOrders = createAsyncThunk(
    'account/orders',
    async () => {
        try {
            const token = sessionStorage.getItem('accessToken')
            const orders = await api.get('api/orders/my-orders', {
                headers: {
                    Authorization: token
                }
            })
            return orders
        } catch (error) {
            throw error
        }
    }
)


export const addToBasket = createAsyncThunk(
    'add/order',
    async (data) => {
        try {
            const sanatizedData = {
                qty: data.qty,
                labelId: data.labelId,
                textToPut: data.textToPut
            }
            return sanatizedData
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)