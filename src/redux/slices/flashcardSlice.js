import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:1800/api/flashcards";

export const fetchFlashcards = createAsyncThunk("flashcards/fetchFlashcards", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const updateFlashcard = createAsyncThunk("flashcards/updateFlashcard", async ({ id, correct }, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.put(`${API_URL}/${id}`, { correct }, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const flashcardSlice = createSlice({
  name: "flashcards",
  initialState: { flashcards: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlashcards.fulfilled, (state, action) => {
        state.flashcards = action.payload;
        state.status = "succeeded";
      })
      .addCase(updateFlashcard.fulfilled, (state, action) => {
        const index = state.flashcards.findIndex(f => f._id === action.payload._id);
        if (index !== -1) {
          state.flashcards[index] = action.payload;
        }
      });
  },
});

export default flashcardSlice.reducer;
