import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/Auth/AuthSlice";
import accountCreateReducer from "../Redux/AccountCreate/AccountCreateSlice";
import accountReducer from "../Redux/AccountSlice/AccountSlice";
import transactionReducer from "../Redux/Transactions/TransactionSlice";
import incomeReducer from "../Redux/IncomeSlice/IncomeSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    accountCreateReducer,
    accountReducer,
    transactionReducer,
    incomeReducer,
  },
});
