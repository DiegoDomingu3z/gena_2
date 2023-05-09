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
    async ({ finalArr, qty, id }) => {
        try {
            const sanatizedData = {
                qty: qty,
                labelId: id,
                textToPut: finalArr
            }
            console.log(sanatizedData)
            return sanatizedData
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)

export const removeFromBasket = createAsyncThunk(
    'remove/label',
    async (id) => {
        try {
            return id
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)


export const getBasketLabels = createAsyncThunk(
    'get/basket',
    async (data) => {
        try {
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)