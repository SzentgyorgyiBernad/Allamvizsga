import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccounts } from "../../Redux/AccountSlice/AccountSlice";
import { logout } from "../../Redux/Auth/AuthSlice";
import { setSelectedAccount } from "../../Redux/AccountSlice/AccountSlice";
import {
  getIncomeByMonths,
  getLastThreeTransaction,
} from "../../Redux/Transactions/TransactionSlice";

export const useMenuScreenLogic = () => {
  const dispatch = useDispatch();
  const accountState = useSelector((state) => state.accountReducer);
  const transactionState = useSelector((state) => state.transactionReducer);
  const { accounts, loading, error, selectedAccount } = accountState;
  const { transactionsByMonths, transactions } = transactionState;
  const [selectedDate, setSelectedDate] = React.useState(6);
  const getAccounts = () => {
    // console.log("getAccounts in logic", token);
    dispatch(getAllAccounts());
    // console.log("accounts", accounts[0]?.currency.name);
  };

  const onLogout = () => {
    dispatch(logout());
  };

  const onSetSelectedAccount = (id) => {
    dispatch(setSelectedAccount(id));
  };

  const getLastSixMonthsIncome = () => {
    dispatch(getIncomeByMonths(selectedAccount.id, selectedDate));
  };

  const getLastThreeTransactions = () => {
    dispatch(getLastThreeTransaction(selectedAccount.id));
    console.log("asd", transactionsByMonths);
  };

  return {
    accounts,
    transactionsByMonths,
    selectedAccount,
    selectedDate,
    transactions,
    setSelectedDate,
    getAccounts,
    onLogout,
    getLastSixMonthsIncome,
    getLastThreeTransactions,
    onSetSelectedAccount,
  };
};
