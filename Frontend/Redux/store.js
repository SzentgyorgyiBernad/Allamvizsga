import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/Auth/AuthSlice";

export const store = configureStore({
  reducer: {
    authReducer,
  },
});


