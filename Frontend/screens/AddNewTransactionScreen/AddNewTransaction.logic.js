import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllTransactionTypes,
  createNewTransaction,
} from "../../Redux/Transactions/TransactionSlice";

export const useAddNewTransactionScreenLogic = () => {
  const [selectedTransaction, setSelectedTransaction] = React.useState(null);
  const [selectedTransactionType, setSelectedTransactionType] =
    React.useState(null);
  const [repetablePeriod, setRepetablePeriod] = React.useState(null);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [description, setDescription] = React.useState("");

  const transactionState = useSelector((state) => state.transactionReducer);
  const { transactionTypes, loading } = transactionState;
  const accountState = useSelector((state) => state.accountReducer);
  const { selectedAccount } = accountState;

  const dispatch = useDispatch();

  const getTransactionTypes = () => {
    dispatch(getAllTransactionTypes());
  };

  const handleTransactionSubmit = (date) => {
    if (selectedTransaction === "Expenditure") {
      dispatch(
        createNewTransaction({
          selectedTransaction,
          selectedTransactionType,
          amount: amount * -1,
          description,
          repetablePeriod,
          repetable: isEnabled,
          date,
          selectedAccount: selectedAccount.id,
        })
      );
    } else {
      dispatch(
        createNewTransaction({
          selectedTransaction,
          selectedTransactionType,
          amount,
          description,
          repetablePeriod,
          repetable: isEnabled,
          date,
          selectedAccount: selectedAccount.id,
        })
      );
    }
    // console.log(
    //   amount,
    //   selectedAccount,
    //   selectedTransaction,
    //   selectedTransactionType
    // );
  };

  return {
    selectedTransaction,
    setSelectedTransaction,
    selectedTransactionType,
    setSelectedTransactionType,
    repetablePeriod,
    setRepetablePeriod,
    isEnabled,
    setIsEnabled,
    setAmount,
    amount,
    setDescription,
    description,
    transactionTypes,
    loading,
    getTransactionTypes,

    handleTransactionSubmit,
  };
};
