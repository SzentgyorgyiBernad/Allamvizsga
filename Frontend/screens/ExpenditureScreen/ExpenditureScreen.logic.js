import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Auth/AuthSlice";
import React from "react";
import {
  getExpendituresFromCurrentMonth,
  getPlannedExpenditures,
  compareToLastMonth,
  createBudget,
} from "../../Redux/Expenditure/ExpenditureSlice";
import uuid from "react-native-uuid";

export const useExpenditureScreenLogic = () => {
  const dispatch = useDispatch();
  const accountState = useSelector((state) => state.accountReducer);
  const { selectedAccount } = accountState;
  const expenditureState = useSelector((state) => state.expenditureReducer);
  const {
    expenditures,
    plannedExpenditures,
    loading,
    error,
    compareToLastMonthPercentage,
    totalAmount,
    budget,
  } = expenditureState;
  const [budgetAmount, setBudgetAmount] = React.useState(0);

  const onLogout = () => {
    dispatch(logout());
  };

  const getExpenditures = () => {
    dispatch(getExpendituresFromCurrentMonth(selectedAccount.id));
  };

  const getMyPlannedExpenditures = () => {
    dispatch(getPlannedExpenditures(selectedAccount.id));
  };

  const getCompareToLastMonth = () => {
    dispatch(compareToLastMonth(selectedAccount.id));
  };

  const setBudget = () => {
    dispatch(
      createBudget({
        id: uuid.v4(),
        accountId: selectedAccount.id,
        budgetAmount,
      })
    );
  };

  return {
    expenditures,
    plannedExpenditures,
    loading,
    error,
    compareToLastMonthPercentage,
    selectedAccount,
    totalAmount,
    budget,
    onLogout,
    getExpenditures,
    getMyPlannedExpenditures,
    getCompareToLastMonth,
    budgetAmount,
    setBudgetAmount,
    setBudget,
  };
};
