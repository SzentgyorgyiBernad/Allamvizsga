import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllTransactionTypes,
  createNewTransaction,
  addToTransaction,
} from "../../Redux/Transactions/TransactionSlice";
import uuid from "react-native-uuid";
import { addIncome } from "../../Redux/IncomeSlice/IncomeSlice";
import { addExpenditure } from "../../Redux/Expenditure/ExpenditureSlice";

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
    const newDate = date.toISOString();
    if (selectedTransaction === "Expenditure") {
      dispatch(
        createNewTransaction({
          id: uuid.v4(),
          selectedTransaction,
          selectedTransactionType: selectedTransactionType.id,
          amount: amount * -1,
          description,
          repetablePeriod,
          repetable: isEnabled,
          date,
          selectedAccount: selectedAccount.id,
        })
      );
      const newTransaction = {
        id: uuid.v4(),
        selectedTransaction,
        income_type: {
          name: selectedTransactionType.name,
        },
        amount: amount * -1,
        note: description,
        repetablePeriod,
        repetable: isEnabled,
        newDate,
        selectedAccount: selectedAccount.id,
      };
      dispatch(addExpenditure(newTransaction));
    } else {
      dispatch(
        createNewTransaction({
          id: uuid.v4(),
          selectedTransaction,
          selectedTransactionType: selectedTransactionType.id,
          amount,
          description,
          repetablePeriod,
          repetable: isEnabled,
          date,
          selectedAccount: selectedAccount.id,
        })
      );
      const newTransaction = {
        id: uuid.v4(),
        selectedTransaction,
        income_type: {
          name: selectedTransactionType.name,
        },
        amount,
        note: description,
        repetablePeriod,
        repetable: isEnabled,
        newDate,
        selectedAccount: selectedAccount.id,
      };
      dispatch(addIncome(newTransaction));
    }
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
