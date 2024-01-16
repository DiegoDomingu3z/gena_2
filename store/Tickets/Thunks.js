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
    const updatedTicket = await api.get(`api/ticket/update/${data.id}`, data, {
      headers: {
        Authorization: token,
      },
    });
    console.log(updatedTicket);
    return updatedTicket.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});
