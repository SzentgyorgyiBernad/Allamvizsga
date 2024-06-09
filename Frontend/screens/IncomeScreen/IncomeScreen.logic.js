import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Auth/AuthSlice";
import {
  getTransactionsFromSpecDate,
  getPlannedTransactions,
} from "../../Redux/IncomeSlice/IncomeSlice";

export const useIncomeScreenLogic = () => {
  const dispatch = useDispatch();
  const accountState = useSelector((state) => state.accountReducer);
  const { selectedAccount } = accountState;
  const incomeState = useSelector((state) => state.incomeReducer);
  const { transactions, budget, plannedTransactions, loading, error } =
    incomeState;

  const [selectedDate, setSelectedDate] = React.useState(6);

  const onLogout = () => {
    dispatch(logout());
  };

  const getTransactions = () => {
    dispatch(getTransactionsFromSpecDate(selectedAccount.id, selectedDate));
  };

  const getMyPlannedTransactions = () => {
    dispatch(getPlannedTransactions(selectedAccount.id));
  };

  return {
    transactions,
    budget,
    plannedTransactions,
    loading,
    error,
    onLogout,
    getTransactions,
    getMyPlannedTransactions,
  };
};
