import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axiosService";



export const getUsers = createAsyncThunk(
    "users",
    async () => {
        try {
            const res = await api.get("api/users").then((res) => res.data)
            return res
        } catch (error) {
            console.log(error)
            return error
        }
    }

)

export const deleteUser = createAsyncThunk(
    "account/delete",
    async ({ id, token }) => {
      try {
        const res = await api
          .delete(`api/account/delete-user/${id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((res) => res.data);
        return res;
      } catch (error) {
        throw error;
      }
    }
  );