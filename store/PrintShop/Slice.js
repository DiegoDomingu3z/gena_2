import { createSlice } from "@reduxjs/toolkit";
import { getApprovedOrders, getDeliveredOrders, getProcessingOrder, printOrder } from "./Thunks";







export const PrintShopSlice = createSlice({
    name: 'PrintShop',
    initialState: {
        approvedOrders: [],
        processingOrders: [],
        deliveredOrders: [],
        loading: false
    },
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(getApprovedOrders.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getApprovedOrders.fulfilled, (state, action) => {
                state.approvedOrders = action.payload
                state.loading = false
            })
            .addCase(getApprovedOrders.rejected, (state, action) => {
                console.log(action.error)
            })
            .addCase(getProcessingOrder.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getProcessingOrder.fulfilled, (state, action) => {
                state.processingOrders = action.payload
                state.loading = false
            })
            .addCase(getProcessingOrder.rejected, (state, action) => {
                console.log(action.error)
            })
            .addCase(getDeliveredOrders.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getDeliveredOrders.fulfilled, (state, action) => {
                state.deliveredOrders = action.payload
                state.loading = false
            })
            .addCase(getDeliveredOrders.rejected, (state, action) => {
                console.log(action.error)
            })
            // print order
            .addCase(printOrder.pending, (state, action) => {
                state.loading = true
            })
            .addCase(printOrder.fulfilled, (state, action) => {
                console.log(action.payload)
                state.approvedOrders.orders = state.approvedOrders.orders.filter(o => o._id != action.payload)
                state.processingOrders.push(action.payload)
                state.loading = false
            })
            .addCase(printOrder.rejected, (state, action) => {
                console.log(action.error)
            })
    }
})


export default PrintShopSlice.reducer