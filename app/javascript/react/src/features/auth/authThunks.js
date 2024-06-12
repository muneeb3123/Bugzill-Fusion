import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { toast } from "react-toastify";

export const login = createAsyncThunk("login/loginUser", async (user) => {
  try {
    const response = await axios.post(
      "https://bug-zilla.onrender.com/login",
      {
        user: user,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("token", response.headers.authorization);
    const data = response.data;
    toast.success(data.message);
    return data;
  } catch (error) {
    // toast.error(error.response.data);
  }
});

export const logout = createAsyncThunk("login/logoutUser", async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete("https://bug-zilla.onrender.com/logout", {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = response.data;
    localStorage.removeItem("token");
    // toast.success(data.message);
    return data;
  } catch (error) {
    throw(error.response.data.message);
  }
});

// export const currentUser = createAsyncThunk("login/currentUser", async () => {
//   const token = localStorage.getItem("token");

//   try {
//     const response = await axios.get("https://bug-zilla.onrender.com/current_user", {
//       headers: {
//         Authorization: token,
//       },
//     });
//     const data = response.data;
//     return data;
//   } catch (error) {
//     throw error.response.data;
//   }
// });

export const signup = createAsyncThunk("signup/signupUser", async (user) => {
  try {
    const response = await axios.post("http://127.0.0.1:3000/signup", {
      user: user,
    });
    const data = response.data;
    localStorage.setItem("token", response.headers.authorization);
    // toast.success(response.data.message);
    return data;
  } catch (error) {
    toast.error(error.response.data.errors[0]);
  }
});

// export const fetchDevelopers = createAsyncThunk(
//   "developers/fetchDevelopers",
//   async () => {
//     const token = localStorage.getItem("token");
//     const response = await axios.get("https://bug-zilla.onrender.com/users/developers", {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//     });
//     return response.data;
//   }
// );

// export const fetchQas = createAsyncThunk("qas/fetchQas", async () => {
//   const token = localStorage.getItem("token");
//   const response = await axios.get("https://bug-zilla.onrender.com/users/qas", {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token,
//     },
//   });
//   return response.data;
// });
