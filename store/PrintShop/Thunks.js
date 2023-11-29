import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axiosService";

export const getApprovedOrders = createAsyncThunk(
  "orders/approved",
  async (token) => {
    try {
      const res = await api
        .get("api/orders/print-shop/approved-by-lead", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const getProcessingOrder = createAsyncThunk(
  "orders/processing",
  async (token) => {
    try {
      const res = await api
        .get("api/orders/print-shop/processing-orders", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const getDeliveredOrders = createAsyncThunk(
  "orders/delivered",
  async (token) => {
    try {
      const res = await api
        .get("api/orders/delivered-orders", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);


export const filterDeliveredOrders = createAsyncThunk(
  "orders/filtered", 
  async({filteredOrders, filteredPDF}, thunkAPI) => {
    try {
        return {filteredOrders, filteredPDF}
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
)

export const deleteDeliveredOrder = createAsyncThunk(
  "deleteOlderOrder/order",
  async ({ id, token }) => {
    try {
      const res = await api
        .delete(`api/orders/delete/${id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const printOrder = createAsyncThunk(
  "orders/print",
  async ({ token, id }) => {
    try {
      const res = await api
        .post(`api/printshop/order/${id}/printing`, null, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const deliverOrder = createAsyncThunk(
  "deliver/order",
  async ({ token, id }) => {
    try {
      const res = await api
        .put(`api/orders/${id}/deliver`, null, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getReadyForPickUpOrders = createAsyncThunk(
  "orders/pickup",
  async (token) => {
    try {
      const res = await api
        .get("api/orders/ready-for-pickup", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const updateToPickup = createAsyncThunk(
  "pickup/order",
  async ({ token, id }) => {
    try {
      const res = await api
        .put(`api/orders/${id}/update-to-pickup`, null, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
