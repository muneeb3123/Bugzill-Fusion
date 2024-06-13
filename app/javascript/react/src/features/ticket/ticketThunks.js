import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://127.0.0.1:3000/api/v1/bugs", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response.data.error) {
        return error.response.data;
      } else {
        toast.error(error.response.data);
      }
    }
  }
);

export const fetchTicketById = createAsyncThunk(
  "tickets/fetchTicketById",
  async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`http://127.0.0.1:3000/api/v1/bugs/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
        return error.response.data.error;
    }
  }
);

export const createTicket = createAsyncThunk(
  "tickets/createTicket",
  async (ticket) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(`http://127.0.0.1:3000/api/v1/bugs`, ticket, {
        headers: {
            "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      toast.success(response.data.message)
      return response.data;
    } catch (error) {
        toast.error(error.response.data.error)
    }
  }
);

export const updateTicket = createAsyncThunk(
    "tickets/updateTicket",
    async ({ticket, id}) => {
        const token = localStorage.getItem("token");
        try {
        const response = await axios.put(
            `http://127.0.0.1:3000/api/v1/bugs/${id}`,
            ticket,
            {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            }
        );
        toast.success(response.data.message);
        return response.data;
        } catch (error) {
            toast.error(error.response.data.error);
        return error.response.data;
        }
    }
    );

export const assignTicket = createAsyncThunk(
  "tickets/assignTicket",
  async (ticketId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `http://127.0.0.1:3000/api/v1/bugs/${ticketId}/assign_bug_or_feature/`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      toast.success(response.data.message);
      return response.data.bug;
    } catch (error) {
      toast.error(error.response.data.error);
      throw error;
    }
  }
);

export const markTicketAsCompleted = createAsyncThunk(
    "tickets/markTicketAsCompleted",
    async (ticketId) => {
        const token = localStorage.getItem("token");
        try {
        const response = await axios.put(
            `http://127.0.0.1:3000/api/v1/bugs/${ticketId}/mark_resolved_or_completed/`,
            null,
            {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            }
        );
        toast.success(response.data.message);
        return response.data.bug;
        } catch (error) {
        toast.error(error.response.data.error);
        throw error;
        }
    }
    );

    export const deleteTicket = createAsyncThunk(
        "tickets/deleteTicket",
        async (ticketId) => {
            const token = localStorage.getItem("token");
            try {
            const response = await axios.delete(
                `http://127.0.0.1:3000/api/v1/bugs/${ticketId}`,
                {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                }
            );
            toast.success(response.data.message);
            return response.data.bug;
            } catch (error) {
            toast.error(error.response.data.error);
            }
        }
        );
