import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axiosService";

export const getOrders = createAsyncThunk("account/orders", async () => {
  try {
    const token = sessionStorage.getItem("accessToken");
    const orders = await api.get("api/orders/my-orders", {
      headers: {
        Authorization: token,
      },
    });
    return orders;
  } catch (error) {
    throw error;
  }
});

export const addToBasket = createAsyncThunk(
  "add/order",
  async ({ finalArr, qty, id }) => {
    try {
      const sanatizedData = {
        qty: qty,
        labelId: id,
        textToPut: finalArr,
      };
      return sanatizedData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const removeFromBasket = createAsyncThunk(
  "remove/label",
  async (index) => {
    try {
      return index;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const placeOrder = createAsyncThunk(
  "submit/order",
  async ({ orderInput, basket, token }) => {
    try {
      const data = {
        name: orderInput.orderName,
        notes: orderInput.orderNote,
        labels: basket,
      };
      const res = await api
        .post("api/orders/create", data, {
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

export const clearBasket = createAsyncThunk("clear/basket", async () => {
  try {
    return "success";
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const getMyOrders = createAsyncThunk(
  "my-orders/order",
  async (token) => {
    try {
      const res = await api
        .get("api/orders/my-orders", {
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

export const removeOrder = createAsyncThunk(
  "remove/order",
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

export const getOrdersToApprove = createAsyncThunk(
  "leads/get-orders",
  async (token) => {
    try {
      const res = await api
        .get("api/orders/need-to-approve", {
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

export const approveOrder = createAsyncThunk(
  "order/approve",
  async ({ token, id }) => {
    try {
      const res = await api
        .put(`api/orders/${id}/approve`, null, {
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
export const declineOrder = createAsyncThunk(
  "order/decline",
  async ({ token, id }) => {
    try {
      const res = await api
        .put(`api/orders/${id}/decline`, null, {
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

export const setActiveOrder = createAsyncThunk(
  "order/setActiveOrder",
  async (order) => {
    try {
      return order;
    } catch (error) {
      throw error;
    }
  }
);

export const updateLabel = createAsyncThunk(
  "order/updateLabel",
  async ({ token, orderId, labelId, valuesArray }) => {
    try {
      const res = await api.put(
        `api/orders/update/${orderId}/label/${labelId}`,
        valuesArray,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getGroupLeadOrderApproveLabels = createAsyncThunk(
  "order/labels/to-approve",
  async (orderArr) => {
    try {
      const res = await api
        .post("api/orders/group-lead/labels/to-see", orderArr)
        .then((res) => res.data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
