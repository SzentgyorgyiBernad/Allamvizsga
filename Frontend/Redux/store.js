import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/Auth/AuthSlice";
import invoiceReducer from "../Redux/InvoiceCreate/InvoiceCreateSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    invoiceReducer,
  },
});
