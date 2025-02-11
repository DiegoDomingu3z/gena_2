import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axiosService";

export const getAllSubCats = createAsyncThunk("subCats/getall", async () => {
  try {
    const res = await api.get("/api/subcategory/all").then((res) => res.data);
    return res;
  } catch (error) {
    throw error;
  }
});

export const getAllInCats = createAsyncThunk(
  "subCats/inCats",
  async (categoryId) => {
    try {
      const res = await api
        .get(`/api/subcategory/incat/${categoryId}`)
        .then((res) => res.data);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const addSubCategory = createAsyncThunk(
  "subCats/add",
  async ({ values, categoryId, token }) => {
    try {
      const res = await api
        .post(`/api/subcategory/create/${categoryId}`, values, {
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

export const removeSubCat = createAsyncThunk(
  "subCat/remove",
  async ({ id, token }) => {
    try {
      const res = await api
        .delete(`/api/subcategory/remove/${id}`, {
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

export const updateSubCat = createAsyncThunk(
  "subCat/update",
  async ({ token, id, newName }) => {
    try {
      const data = { name: newName };
      const res = await api
        .put(`api/subcategory/update/${id}`, data, {
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

export const updateJiraSubCategoryPoints = createAsyncThunk(
  'update/jira-points',
  async ({token, id, newJiraPoints}) => {
    try {
      const data = {points: newJiraPoints}
      console.log(newJiraPoints)
      const res = await api.put(`api/subcategory/${id}/jira-points`, data, {
        headers: {
          Authorization: token
        }
      })
      .then((res) => res.data)
      return res
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
)
