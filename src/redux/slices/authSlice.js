import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const loginUser = createAsyncThunk("auth/loginUser", async (credentials, thunkAPI) => {
  try {
    const { data } = await axios.post(`${API_URL}/login`, credentials);
    localStorage.setItem("token", data.token);
    return data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const registerUser = createAsyncThunk("auth/registerUser", async (userData, thunkAPI) => {
  try {
    const { data } = await axios.post(`${API_URL}/register`, userData);
    return data.message;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, status: "idle", error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
