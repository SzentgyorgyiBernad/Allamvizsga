import React from "react";
import { useAppDispatch } from "../../Hooks/hooks";
import { useAppSelector } from "../../Hooks/hooks";
import {
  getAllCurrencyFromDB,
  invoiceSelector,
} from "../../Redux/InvoiceCreate/InvoiceCreateSlice";

export const useInvoiceCreateScreenLogic = () => {
  const invoiceState = useAppSelector(invoiceSelector);
  const { currencies, loading, selectedCurrency, amount } = invoiceState;
  const allCurrency = currencies;

  const [error, setError] = React.useState();
  const dispatch = useAppDispatch();

  const getAllCurrency = async () => {
    await dispatch(getAllCurrencyFromDB());
  };

  const handleError = (key, message) => {
    setError((prevState) => ({ ...prevState, [key]: message }));
  };

  const handleInvoiceCreate = () => {
    console.log("handle invoice create", selectedCurrency, amount);
    // dispatch()
  };

  return {
    error,
    allCurrency,
    loading,
    getAllCurrency,
    handleInvoiceCreate,
  };
};
