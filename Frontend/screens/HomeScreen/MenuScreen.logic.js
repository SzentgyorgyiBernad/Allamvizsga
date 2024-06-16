import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAccounts,
  setSelectedAccount,
} from "../../Redux/AccountSlice/AccountSlice";
import { logout } from "../../Redux/Auth/AuthSlice";
import {
  getIncomeByMonths,
  getLastThreeTransaction,
} from "../../Redux/Transactions/TransactionSlice";
import { getAllCurrencyFromDB } from "../../Redux/AccountCreate/AccountCreateSlice";

export const useMenuScreenLogic = () => {
  const dispatch = useDispatch();
  const accountState = useSelector((state) => state.accountReducer);
  const transactionState = useSelector((state) => state.transactionReducer);
  const { accounts, loading, error, selectedAccount, currencies } =
    accountState;
  const { transactionsByMonths, transactions } = transactionState;
  const [selectedDate, setSelectedDate] = React.useState(6);

  const [selectedCurrency, setSelectedCurrency] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [name, setName] = React.useState("");

  const getAccounts = () => {
    // console.log("getAccounts in logic");
    dispatch(getAllAccounts());
    // console.log("accounts", accounts[0]?.currency.name);
  };

  const onLogout = () => {
    dispatch(logout());
  };

  const getAllCurrency = () => {
    // console.log("get all currency");
    dispatch(getAllCurrencyFromDB());
  };

  const onSetSelectedAccount = (id) => {
    dispatch(setSelectedAccount(id));
  };

  const getLastSixMonthsIncome = () => {
    dispatch(getIncomeByMonths(selectedAccount.id));
  };

  const getLastThreeTransactions = () => {
    dispatch(getLastThreeTransaction(selectedAccount.id));
    // console.log("asd", transactionsByMonths);
  };

  const handleAccountCreate = () => {
    dispatch(
      createDefaultAccount({
        selectedCurrency,
        amount,
        accountName: name,
        email,
      })
    );
  };

  return {
    accounts,
    transactionsByMonths,
    selectedAccount,
    selectedDate,
    transactions,
    currencies,
    loading,
    error,
    setSelectedDate,
    getAccounts,
    onLogout,
    getLastSixMonthsIncome,
    getLastThreeTransactions,
    onSetSelectedAccount,
    getAllCurrency,

    selectedCurrency,
    setSelectedCurrency,
    amount,
    setAmount,
    name,
    setName,
  };
};
