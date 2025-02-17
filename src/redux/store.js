import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import flashcardReducer from "./slices/flashcardSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    flashcards: flashcardReducer,
  },
});
