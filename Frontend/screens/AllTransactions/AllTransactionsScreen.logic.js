import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { getAllTransactionWithDate } from "../../Redux/Transactions/TransactionSlice";

export const useAllTransactionsScreenLogic = () => {
  const dispatch = useDispatch();
  const now = new Date();
  const tomorrow = now.getDate() + 1;
  const [startDate, setStartDate] = React.useState(now);
  const [endDate, setEndDate] = React.useState(tomorrow);
  const [period, setPeriod] = React.useState("month");

  const accountState = useSelector((state) => state.accountReducer);
  const { selectedAccount } = accountState;
  const transactionState = useSelector((state) => state.transactionReducer);
  const {
    allTransactions,
    transactionsWithType,
    loading,
    error,
    incomeNumber,
    expenditureNumber,
    incomeAmount,
    expenditureAmount,
    incomeType,
    outcomeType,
  } = transactionState;

  const setCustomPeriod = () => {
    const startYear = startDate.split("-")[0];
    const startMonth = startDate.split("-")[1];
    const startDay = startDate.split("-")[2];
    const endYear = endDate.split("-")[0];
    const endMonth = endDate.split("-")[1];
    const endDay = endDate.split("-")[2];
    const fullEndDate = `${endYear}-${endMonth}-${endDay}T23:59:59.999Z`;
    const fullStartDate = `${startYear}-${startMonth}-${startDay}T00:00:00.000Z`;
    const fullDate = `${fullStartDate}l${fullEndDate}`;
    setPeriod(fullDate);
  };

  const getAllMyTransactionsWithDate = () => {
    if (period === "week") {
      const now = new Date();
      now.setDate(now.getDate() - 6);
      const date = now.toISOString().split("T")[0];
      const fullDate = `${date}T00:00:00.000Zl`;
      dispatch(
        getAllTransactionWithDate({
          accountId: selectedAccount.id,
          date: fullDate,
        })
      );
      return;
    }
    if (period === "month") {
      const now = new Date();
      const year = now.getFullYear();
      let month = now.toISOString().split("-")[1] - 1;
      if (month <= 9 && month > 0) {
        month = `0${month}`;
      }
      const day = now.getDate();
      const fullDate = `${year}-${month}-${day}T00:00:00.000Zl`;
      dispatch(
        getAllTransactionWithDate({
          accountId: selectedAccount.id,
          date: fullDate,
        })
      );
      return;
    }
    if (period === "year") {
      const now = new Date();
      const year = now.toISOString().split("-")[0] - 1;
      let month = now.getMonth();
      if (month <= 9 && month > 0) {
        month = `0${month + 1}`;
      }
      const day = now.getDate();
      const fullDate = `${year}-${month}-${day}T00:00:00.000Zl`;
      dispatch(
        getAllTransactionWithDate({
          accountId: selectedAccount.id,
          date: fullDate,
        })
      );
      return;
    }
    dispatch(
      getAllTransactionWithDate({
        accountId: selectedAccount.id,
        date: period,
      })
    );

    return;
  };

  return {
    loading,
    error,
    period,
    setPeriod,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    getAllMyTransactionsWithDate,
    setCustomPeriod,
    allTransactions,
    incomeNumber,
    expenditureNumber,
    incomeAmount,
    expenditureAmount,
    incomeType,
    outcomeType,
  };
};
