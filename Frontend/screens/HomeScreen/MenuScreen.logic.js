import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAccounts,
  setSelectedAccount,
  setAmountToSelectedAccount,
  addToAccounts,
} from "../../Redux/AccountSlice/AccountSlice";
import { logout } from "../../Redux/Auth/AuthSlice";
import {
  getIncomeByMonths,
  getLastThreeTransaction,
} from "../../Redux/Transactions/TransactionSlice";
import {
  getAllCurrencyFromDB,
  createDefaultAccount,
} from "../../Redux/AccountCreate/AccountCreateSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

export const useMenuScreenLogic = () => {
  const dispatch = useDispatch();
  const accountState = useSelector((state) => state.accountReducer);
  const transactionState = useSelector((state) => state.transactionReducer);
  const currencystate = useSelector((state) => state.accountCreateReducer);
  const { accounts, loading, error, selectedAccount } = accountState;
  const { transactionsByMonths, transactions } = transactionState;
  const [selectedDate, setSelectedDate] = React.useState(6);
  const { currencies } = currencystate;

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

  const handleAccountCreate = async () => {
    const email = await AsyncStorage.getItem("email");
    const id = uuid.v4();
    dispatch(
      createDefaultAccount({
        id: id,
        selectedCurrency,
        amount,
        accountName: name,
        email,
      })
    );
    console.log("create account", selectedCurrency, amount, name);
    const account = {
      id,
      currency: { name: selectedCurrency },
      balance: amount,
      name: name,
    };
    dispatch(addToAccounts(account));
    // console.log(AsyncStorage.getItem("email"));
    // console.log("create account", selectedCurrency, amount, name);
  };

  const onDeleteAccount = () => {
    console.log("delete account");
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
    handleAccountCreate,
    selectedCurrency,
    setSelectedCurrency,
    amount,
    setAmount,
    name,
    setName,
  };
};
