import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  logout,
  currentUser,
  signup,
  // fetchDevelopers,
  // fetchQas,
} from "./authThunks";

const initialState = {
  loading: false,
  error: null,
  user: null,
  developers: [],
  qas: [],
  isLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload)
      if (
        action.payload &&
        action.payload.user !== undefined &&
        action.payload.user !== null
      ) {
        state.user = action.payload.user;
        state.isLogin = true;
      }
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.isLogin = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(currentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(currentUser.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload)
      if (
        action.payload &&
        action.payload.user !== undefined &&
        action.payload.user !== null
      ) {
        state.user = action.payload.user;
        state.isLogin = true;
      }
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      if (
        action.payload &&
        action.payload.user !== undefined &&
        action.payload.user !== null
      ) {
        state.user = action.payload.user;
        state.isLogin = true;
      }
    });
    // builder.addCase(fetchDevelopers.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.developers = action.payload;
    // });
    // builder.addCase(fetchDevelopers.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // });
    // builder.addCase(fetchQas.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.qas = action.payload;
    // });
    // builder.addCase(fetchQas.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // });
  },
});

export default authSlice.reducer;
