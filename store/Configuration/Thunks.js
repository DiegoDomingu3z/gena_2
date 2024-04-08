import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axiosService";

export const updateConfig = createAsyncThunk("configuration/update",
 async ({values, token}) => {
    try {
      const res = await api.put("api/config", values, {
        headers:{
            Authorization: token
        } 
      }).then((res) => res.data);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  });


  export const getConfig = createAsyncThunk("configuration/get",
  async (token) => {
    console.log(token)
    try {
        const res = await api.get("api/config/response", {
            headers: {
                Authorization: token.token
            }
        }).then((res) => res.data)
        return res
    } catch (error) {
        console.log(error);
        throw error;
    }
  })
  

  export const testEmailConnection = createAsyncThunk("configuration/email-connection",
  async () => {
    try {
        const res = await api.get("api/config/email-connection-status").then((res) => res.data)
        return res
    } catch (error) {
        console.log(error);
        throw error;
    }
  })


  export const testJiraDomainConnection = createAsyncThunk("configuration/jira-connection",
  async () => {
    try {
        const res = await api.get("api/config/jira-connection-status").then((res) => res.data)
        return res
    } catch (error) {
        console.log(error);
        throw error;
        
    }
  })