import { addToBasket, getOrders } from "./thunks";
import { createSlice } from "@reduxjs/toolkit";


export const OrdersSlice = createSlice({
    name: 'Orders',
    initialState: {
        labelBasket: [],
        activeNote: '',
        myOrders: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(addToBasket.pending, (state, action) => {
                console.log('YOLO')
            })
            .addCase(addToBasket.fulfilled, (state, action) => {
                state.labelBasket.push(action.payload)
                console.log(state.labelBasket, "REDUX STORE")
            })
            .addCase(addToBasket.rejected, (state, action) => {
                console.log(action.error)
            })
    }
})