import { createSlice } from "@reduxjs/toolkit";
import { getTickets, updateTicket } from "./Thunks";

export const TicketSlice = createSlice({
  name: "Ticket",
  initialState: {
    tickets: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTickets.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.tickets = action.payload;
        state.loading = false;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateTicket.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        state.tickets = [...state.tickets, action.payload];
        state.loading = false;
      })
      .addCase(updateTicket.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default TicketSlice.reducer;
