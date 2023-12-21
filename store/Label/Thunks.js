import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axiosService";
import { useSelector } from "react-redux";
import { headers } from "../../next.config";

export const createLabelInfo = createAsyncThunk(
  "label/createInfo",
  async ({ data, formData }) => {
    try {
      const token = await sessionStorage.getItem("accessToken");
      const res = await api
        .post(
          `/api/upload/label/cat/${data.categoryId}/subCat/${data.subCategoryId}`,
          data,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => res.data);
      const res2 = await api.post(
        `/api/upload/pdf/cat/${data.categoryId}/subCat/${data.subCategoryId}`,
        formData,
        {
          headers: {
            Authorization: token,
          },
          contentType: false,
          processData: false,
        }
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getLabels = createAsyncThunk(
  "label/getLabels",
  async ({ activeCategory, activeSubCategoryId }) => {
    try {
      const res = await api
        .get(
          `api/upload/get/category/${activeCategory}/subCategory/${activeSubCategoryId}`
        )
        .then((res) => res.data);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const searchLabel = createAsyncThunk(
  "label/search",
  async ({ data, token }) => {
    try {
      const res = await api
        .get(`/api/upload/search?q=${data}`, {
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

export const findLabelFields = createAsyncThunk(
  "field/label",
  async (formData) => {
    try {
      const res = await api
        .post(`api/upload/find-pdf-fields`, formData)
        .then((res) => res.data);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getLabelById = createAsyncThunk("label/byId", async (id) => {
  try {
    const res = await api
      .get(`api/upload/label/byId/${id}`)
      .then((res) => res.data);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const removeLabel = createAsyncThunk(
  "label/remove",
  async ({ id, token }) => {
    try {
      const res = await api
        .delete(`api/upload/label/delete/${id}`, {
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

export const updateSerialLabel = createAsyncThunk(
  "label/updateSerial",
  async ({ formData, pdfData, token }) => {
    try {
      const res = await api.put(
        `api/upload/update-label-db/${formData.id}`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = res.data;
      console.log("%cThunks.js line:134 pdfData", "color: #26bfa5;", pdfData);
      const res2 = await api.post(
        `/api/upload/pdf/cat/${data.categoryId}/subCat/${data.subCategoryId}`,
        pdfData,
        {
          headers: {
            Authorization: token,
          },
          contentType: false,
          processData: false,
        }
      );
      console.log("%cThunks.js line:135 res.data", "color: #26bfa5;", res.data);
      return res.data;
    } catch (error) {
      console.log("%cThunks.js line:126 error", "color: #26bfa5;", error);
    }
  }
);
