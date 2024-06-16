import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Auth/AuthSlice";
import {
  getExpendituresFromCurrentMonth,
  getPlannedExpenditures,
  compareToLastMonth,
} from "../../Redux/Expenditure/ExpenditureSlice";

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
  };
};
