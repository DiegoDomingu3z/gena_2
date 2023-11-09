import { createSlice } from "@reduxjs/toolkit";
import { deliverOrder, getApprovedOrders, getDeliveredOrders, getProcessingOrder, printOrder, deleteDeliveredOrder, updateToPickup, getReadyForPickUpOrders } from "./Thunks";







export const PrintShopSlice = createSlice({
    name: 'PrintShop',
    initialState: {
        approvedOrders: [],
        processingOrders: [],
        deliveredOrders: [],
        pickupOrders: [],
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
                state.approvedOrders.orders = state.approvedOrders.orders.filter(o => o._id !== action.payload);
                state.processingOrders.orders.push(action.payload)
                state.loading = false
            })
            .addCase(printOrder.rejected, (state, action) => {
                console.log(action.error)
            })
            .addCase(deleteDeliveredOrder.pending, (state, action) => {
                state.loading = true
            })
            .addCase(deleteDeliveredOrder.fulfilled, (state, action) => {
                state.loading = false
                state.deliveredOrders.orders = state.deliveredOrders.orders.filter(o => o._id != action.payload._id)
            })
            .addCase(deleteDeliveredOrder.rejected, (state, action) => {
                console.log(action.error)
            })
            .addCase(deliverOrder.fulfilled, (state, action) => {
                state.loading = false
                state.processingOrders.orders = state.processingOrders.orders.filter(o => o._id != action.payload._id)
            })
            .addCase(updateToPickup.pending, (state, action) => {
                state.loading = true
            })
            .addCase(updateToPickup.fulfilled, (state, action) => {
                state.pickupOrders.orders = state.pickupOrders.orders.filter(o => o._id != action.payload._id)
                state.loading = false
            })
            .addCase(updateToPickup.rejected, (state, action) => {
                console.log(action.error)
            })
            .addCase(getReadyForPickUpOrders.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getReadyForPickUpOrders.fulfilled, (state, action) => {
                state.pickupOrders = action.payload
            })
            .addCase(getReadyForPickUpOrders.rejected, (state, action) => {
                console.log(action.error)
            })

    }
})


export default PrintShopSlice.reducer