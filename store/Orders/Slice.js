import { addToBasket, getBasketLabels, getOrders } from "./thunks";
import { createSlice } from "@reduxjs/toolkit";


export const OrdersSlice = createSlice({
    name: 'Orders',
    initialState: {
        labelBasket: [],
        activeNote: '',
        myOrders: [],
        loading: false,
        currentBasketLabels: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(addToBasket.pending, (state, action) => {
                console.log('YOLO')
            })
            .addCase(addToBasket.fulfilled, (state, action) => {
                console.log(action.payload)
                state.labelBasket.push(action.payload)
                console.log(state.labelBasket, "REDUX STORE")
            })
            .addCase(addToBasket.rejected, (state, action) => {
                console.log(action.error)
            })
            .addCase(getBasketLabels.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getBasketLabels.fulfilled, (state, action) => {
                state.loading = false
                state.currentBasketLabels = action.payload
            })
            .addCase(getBasketLabels.rejected, (state, action) => {
                state.loading = false
                console.log(action.error)
            })
    }
})

export default OrdersSlice.reducer