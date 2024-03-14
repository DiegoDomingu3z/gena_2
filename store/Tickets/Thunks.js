import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axiosService";

export const getTickets = createAsyncThunk("tickets/getTickets", async () => {
  try {
    const token = sessionStorage.getItem("accessToken");
    const tickets = await api.get("api/ticket/tickets", {
      headers: {
        Authorization: token,
      },
    });
    return tickets.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});
export const updateTicket = createAsyncThunk("tickets/update", async (data) => {
  try {
    const token = sessionStorage.getItem("accessToken");
    const updatedTicket = await api.put(`api/ticket/update/${data.id}`, data, {
      headers: {
        Authorization: token,
      },
    });
    return updatedTicket.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});
export const createTicket = createAsyncThunk("tickets/create", async (data) => {
  try {
    const token = sessionStorage.getItem("accessToken");
    const newTicket = await api.post(`api/ticket/create`, data, {
      headers: {
        Authorization: token,
      },
    });
    return newTicket.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});
