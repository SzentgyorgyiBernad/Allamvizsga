import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/Auth/AuthSlice";
import accountCreateReducer from "../Redux/AccountCreate/AccountCreateSlice";
import accountReducer from "../Redux/AccountSlice/AccountSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    accountCreateReducer,
    accountReducer,
  },
});
