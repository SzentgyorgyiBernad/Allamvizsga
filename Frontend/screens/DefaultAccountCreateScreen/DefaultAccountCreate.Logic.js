import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createDefaultAccount,
  getAllCurrencyFromDB,
} from "../../Redux/AccountCreate/AccountCreateSlice";

export const useInvoiceCreateScreenLogic = () => {
  const accountState = useSelector((state) => state.accountCreateReducer);
  const { currencies, loading } = accountState;
  const authState = useSelector((state) => state.authReducer);
  const email = authState.email;

  const [error, setError] = React.useState();
  const [selectedCurrency, setSelectedCurrency] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const dispatch = useDispatch();

  const getAllCurrency = () => {
    dispatch(getAllCurrencyFromDB());
  };

  const handleError = (key, message) => {
    setError((prevState) => ({ ...prevState, [key]: message }));
  };

  const handleAccountCreate = () => {
    dispatch(
      createDefaultAccount({
        selectedCurrency,
        amount,
        accountName: "Main",
        email,
      })
    );
  };

  return {
    error,
    currencies,
    loading,
    getAllCurrency,
    handleAccountCreate,
    setAmount,
    setSelectedCurrency,
    amount,
    selectedCurrency,
  };
};
