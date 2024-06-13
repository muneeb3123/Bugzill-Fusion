import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTickets,
  createTicket,
  fetchTicketById,
  markTicketAsCompleted,
  assignTicket,
  updateTicket,
  deleteTicket,
} from "./ticketThunks";
import { logout } from "../auth/authThunks";
import { fetchProjectTickets } from "../project_tickets/projectTicketThunks";

const initialState = {
  loading: false,
  error: null,
  tickets: [],
};

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTickets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      if (action.payload.error !== undefined) {
        state.loading = false;
        state.error = action.payload.error;
      } else {
        state.error = null;
        state.loading = false;
        state.tickets = action.payload;
      }
    });
    builder.addCase(fetchTickets.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(createTicket.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTicket.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.tickets.push(action.payload);
    });
    builder.addCase(createTicket.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateTicket.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTicket.fulfilled, (state, action) => {
      state.loading = false;
      const updatedTicketIndex = state.tickets.findIndex(
        (ticket) => ticket.id === action.payload.id
      );
      if (updatedTicketIndex !== -1) {
        state.tickets[updatedTicketIndex] = action.payload;
      }
    });
    builder.addCase(updateTicket.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchTicketById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTicketById.fulfilled, (state, action) => {
      state.loading = false;
      state.tickets.push(action.payload);
    });
    builder.addCase(fetchTicketById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.tickets = [];
      state.error = null;
    });
    builder.addCase(markTicketAsCompleted.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(markTicketAsCompleted.fulfilled, (state, action) => {
      state.loading = false;
      state.tickets = state.tickets.map((ticket) => {
        if (ticket.id === action.payload.id) {
          return action.payload;
        }
        return ticket;
      });
    });
    builder.addCase(assignTicket.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(assignTicket.fulfilled, (state, action) => {
      state.loading = false;
      state.tickets = state.tickets.map((ticket) => {
        if (ticket.id === action.payload.id) {
          return action.payload;
        }
        return ticket;
      });
    });
    builder.addCase(deleteTicket.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTicket.fulfilled, (state, action) => {
      state.loading = false;
      state.tickets = state.tickets.filter(
        (ticket) => ticket.id !== action.payload.id
      );
    });
    builder.addCase(fetchProjectTickets.fulfilled, (state, action) => {
      state.tickets = action.payload.bugs;
    });
  },
});

export const { remove } = ticketSlice.actions;

export default ticketSlice.reducer;
