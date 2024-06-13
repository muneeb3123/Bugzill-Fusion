import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const search = createAsyncThunk("search/search", async (value) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      `http://127.0.0.1:3000/api/v1/projects/search?query=${value}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

const initialState = {
  loading: false,
  error: null,
  searchResults: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(search.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(search.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.loading = false;
        state.error = action.payload.error;
        return;
      } else {
        state.error = null;
        state.loading = false;
        state.searchResults = action.payload;
      }
    });
    builder.addCase(search.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearSearch } = searchSlice.actions;

export default searchSlice.reducer;
