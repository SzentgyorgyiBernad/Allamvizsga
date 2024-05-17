import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/Auth/AuthSlice";
import accountReducer from "../Redux/AccountCreate/AccountCreateSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    accountReducer,
  },
});
