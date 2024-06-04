import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccounts } from "../../Redux/AccountSlice/AccountSlice";
import { logout } from "../../Redux/Auth/AuthSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useMenuScreenLogic = () => {
  const dispatch = useDispatch();
  const accountState = useSelector((state) => state.accountReducer);
  const { accounts, loading, error } = accountState;
  // const token = AsyncStorage.getItem("token");

  const getAccounts = () => {
    // console.log("getAccounts in logic", token);
    dispatch(getAllAccounts());
    console.log("accounts", accounts[0]?.currency.name);
  };

  const onLogout = () => {
    dispatch(logout());
  };

  return {
    accounts,
    getAccounts,
    onLogout,
  };
};
