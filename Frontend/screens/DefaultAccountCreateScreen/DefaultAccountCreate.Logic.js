import React from "react";
import { useAppDispatch } from "../../Hooks/hooks";
import { useAppSelector } from "../../Hooks/hooks";
import {
  createDefaultAccount,
  getAllCurrencyFromDB,
  accountSelector,
} from "../../Redux/AccountCreate/AccountCreateSlice";

export const useInvoiceCreateScreenLogic = () => {
  //accountState
  // console.log("accountState");
  const accountState = useAppSelector(accountSelector);
  // console.log("accountState utan");
  const { currencies, loading } = accountState;
  const { selectedCurrency, amount } = accountState;
  // console.log("accountState", currencies);
  // const allCurrency = currencies;
  //userState
  const authState = useAppSelector((state) => state.authReducer);
  const email = authState.email;

  const [error, setError] = React.useState();
  const dispatch = useAppDispatch();

  const getAllCurrency = () => {
    dispatch(getAllCurrencyFromDB());
    console.log("allCurrency", currencies);
  };

  const handleError = (key, message) => {
    setError((prevState) => ({ ...prevState, [key]: message }));
  };

  const handleInvoiceCreate = () => {
    console.log(
      "Ezzel megy a backend asdwafsfele",
      selectedCurrency,
      amount,
      email
    );
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
    handleInvoiceCreate,
  };
};
