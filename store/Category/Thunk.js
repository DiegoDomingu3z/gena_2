import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axiosService";

export const getCategories = createAsyncThunk("category/getall", async () => {
  try {
    const res = await api.get("/api/category/all").then((res) => res.data);
    console.log(res, "DATA");
    return res;
  } catch (error) {
    throw error;
  }
});

export const addCategory = createAsyncThunk(
  "category/add",
  async ({ values, token }) => {
    try {
      console.log(values);
      const res = await api
        .post("/api/category/create", values, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data);
      console.log(res, "THUNK DATA");
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const removeCategory = createAsyncThunk(
  "category/remove",
  async ({ id, token }) => {
    try {
      const res = await api
        .delete(`api/category/delete/${id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getCategory = createAsyncThunk("category/by-id", async (id) => {
  try {
    console.log(id);
    const res = await api.get(`api/category/${id}`).then((res) => res.data);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const updateCategory = createAsyncThunk(
  "update/category",
  async ({ token, id, newName }) => {
    try {
      const data = { name: newName };
      const res = await api
        .put(`api/category/update/${id}`, data, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
