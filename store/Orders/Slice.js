import { addToBasket, approveOrder, clearBasket, declineOrder, getBasketLabels, getMyOrders, getOrders, getOrdersToApprove, placeOrder, removeFromBasket, removeOrder, setActiveOrder, updateLabel, } from "./thunks";
import { createSlice } from "@reduxjs/toolkit";


export const OrdersSlice = createSlice({
    name: 'Orders',
    initialState: {
        labelBasket: [],
        activeNote: '',
        activeOrder: '',
        myOrders: [],
        loading: false,
        leadDepartmentOrders: []
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
                state.myOrders.orders.push(action.payload)

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
                state.myOrders = state.myOrders.orders.filter(o => o._id != action.payload._id)

            })
            .addCase(removeOrder.rejected, (state, action) => {
                console.log(action.error)
            })
            // Orders lead needs to approve
            .addCase(getOrdersToApprove.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getOrdersToApprove.fulfilled, (state, action) => {
                state.loading = false
                state.leadDepartmentOrders = action.payload
            })
            .addCase(getOrdersToApprove.rejected, (state, action) => {
                console.log(action.error)
            })
            // APPROVE ORDER
            .addCase(approveOrder.pending, (state, action) => {
                state.loading = true
            })
            .addCase(approveOrder.fulfilled, (state, action) => {
                state.loading = false
                state.leadDepartmentOrders = state.leadDepartmentOrders.filter(o => o._id != action.payload._id)
            })
            .addCase(approveOrder.rejected, (state, action) => {
                console.log(action.error)
            })
            // DECLINE ORDER
            .addCase(declineOrder.pending, (state, action) => {
                state.loading = true
            })
            .addCase(declineOrder.fulfilled, (state, action) => {
                state.loading = false
                state.leadDepartmentOrders = state.leadDepartmentOrders.filter(o => o._id != action.payload._id)
            })
            .addCase(declineOrder.rejected, (state, action) => {
                console.log(action.error)
            })
            .addCase(setActiveOrder.fulfilled, (state, action) => {
                state.activeOrder = action.payload
            })
            .addCase(setActiveOrder.rejected, (state, action) => {
                console.log(action.error)
            })
            .addCase(updateLabel.fulfilled, (state, action) => {
                console.log(action.payload)
            })
            .addCase(updateLabel.rejected, (state, action) => {
                console.log(action.error)
            })
    }
})

export default OrdersSlice.reducer