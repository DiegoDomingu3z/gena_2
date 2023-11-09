import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axiosService";

export const getMaterials = createAsyncThunk("materials/get", async (token) => {
  try {
    const res = await api
      .get("api/materials/getall", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => res.data);
    return res;
  } catch (error) {
    throw error;
  }
});

export const updateMaterial = createAsyncThunk(
  "materials/update",
  async ({ token, values }) => {
    try {
      const res = await api.post("api/materials/update", values, {
        headers: {
          Authorization: token,
        },
      });
      return res;
    } catch (error) {
      throw error;
    }
  }
);

export const createNewMaterial = createAsyncThunk(
  "materials/create",
  async ({ token, values }) => {
    try {
      const res = await api.post("api/materials/create", values, {
        headers: {
          Authorization: token,
        },
      });
      return res;
    } catch (error) {
      throw error;
    }
  }
);
