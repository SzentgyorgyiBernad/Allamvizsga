import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Auth/AuthSlice";
import {
  getTransactionsFromCurrentMonth,
  getPlannedTransactions,
  compareToLastMonth,
  getGoals,
  createGoal,
  addMoneyToGoal,
  addMoneyToGoals,
} from "../../Redux/IncomeSlice/IncomeSlice";
import React from "react";
import uuid from "react-native-uuid";

export const useIncomeScreenLogic = () => {
  const dispatch = useDispatch();
  const accountState = useSelector((state) => state.accountReducer);
  const { selectedAccount } = accountState;
  const incomeState = useSelector((state) => state.incomeReducer);
  const {
    transactions,
    budget,
    plannedTransactions,
    loading,
    error,
    totalAmount,
    compareToLastMonthPercentage,
    goals,
  } = incomeState;

  const [goalName, setGoalName] = React.useState("");
  const [goalAmount, setGoalAmount] = React.useState(null);
  const [endDate, setEndDate] = React.useState(new Date());
  const [description, setDescription] = React.useState("");

  const onLogout = () => {
    dispatch(logout());
  };

  const getTransactions = () => {
    // console.log("getTransactions in logic", selectedAccount);
    dispatch(getTransactionsFromCurrentMonth(selectedAccount.id));
  };

  const getMyPlannedTransactions = () => {
    // console.log("getMyPlannedTransactions in logic", selectedAccount);
    dispatch(getPlannedTransactions(selectedAccount.id));
  };
  const getCompareToLastMonth = () => {
    dispatch(compareToLastMonth(selectedAccount.id));
  };

  const getMyGoals = () => {
    dispatch(getGoals(selectedAccount.id));
  };

  const handleGoalCreate = () => {
    dispatch(
      createGoal({
        id: uuid.v4(),
        goalName,
        goalAmount,
        endDate,
        description,
        accountId: selectedAccount.id,
      })
    );
  };

  const addMoney = (amount, goalId) => {
    console.log("addMoney", amount, goalId);
    dispatch(addMoneyToGoal({ amount, goalId }));
    dispatch(addMoneyToGoals(amount, goalId));
  };

  return {
    transactions,
    budget,
    plannedTransactions,
    loading,
    error,
    totalAmount,
    compareToLastMonthPercentage,
    selectedAccount,
    onLogout,
    getTransactions,
    getMyPlannedTransactions,
    getCompareToLastMonth,

    goalName,
    setGoalName,
    goalAmount,
    setGoalAmount,
    endDate,
    setEndDate,
    description,
    setDescription,
    handleGoalCreate,
    goals,
    getMyGoals,
    addMoney,
  };
};
