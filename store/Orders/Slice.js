import { addToBasket, getBasketLabels, getOrders, removeFromBasket } from "./thunks";
import { createSlice } from "@reduxjs/toolkit";


export const OrdersSlice = createSlice({
    name: 'Orders',
    initialState: {
        labelBasket: [],
        activeNote: '',
        myOrders: [],
        loading: false,

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
            .addCase(removeFromBasket.fulfilled, (state, action) => {
                state.loading = false
                console.log(action.payload)
                state.labelBasket = state.labelBasket.filter(c => c.labelId != action.payload)
            })
    }
})

export default OrdersSlice.reducer