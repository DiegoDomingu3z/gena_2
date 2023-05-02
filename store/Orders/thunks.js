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
        } catch(error) {
            throw error
        }
    }
)