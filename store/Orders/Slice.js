import { addToBasket, clearBasket, getBasketLabels, getMyOrders, getOrders, placeOrder, removeFromBasket, removeOrder } from "./thunks";
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
            // remove item from basket state
            .addCase(removeFromBasket.fulfilled, (state, action) => {
                state.loading = false
                const basketLabelsCopy = state.labelBasket.slice();
                basketLabelsCopy.splice(0, 1);
                state.labelBasket = basketLabelsCopy
                console.log(state.labelBasket)
            })
            // place order to server
            .addCase(placeOrder.pending, (state, action) => {
                state.loading = true
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.loading = false
                state.myOrders.push(action.payload)

            })
            .addCase(placeOrder.rejected, (state, action) => {
                console.log(action.error)
            })
            // clear basket state when order is placed
            .addCase(clearBasket.fulfilled, (state, action) => {
                state.labelBasket = []
            })
            // get my orders
            .addCase(getMyOrders.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getMyOrders.fulfilled, (state, action) => {
                state.loading = false
                state.myOrders = action.payload

            })
            .addCase(getMyOrders.rejected, (state, action) => {
                console.log(action.error)
            })
            // delete order
            .addCase(removeOrder.pending, (state, action) => {
                state.loading = true
            })
            .addCase(removeOrder.fulfilled, (state, action) => {
                state.loading = false
                state.myOrders = state.myOrders.filter(o => o._id != action.payload._id)

            })
            .addCase(removeOrder.rejected, (state, action) => {
                console.log(action.error)
            })
    }
})

export default OrdersSlice.reducer