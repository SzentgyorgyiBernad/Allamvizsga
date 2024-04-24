import { useEffect, useState } from "react";
import { TabNavigation } from "./TabNavigation/TabNavigation";
import { ActivityIndicator, View } from "react-native";
import { AuthStack } from "./StackNavigation/AuthStack";
import { Default } from "./StackNavigation/Default";
import { useDispatch, useSelector } from "react-redux";
import { loginSilently } from "../Redux/Auth/AuthSlice";

export const RootNavigation = () => {
  const authState = useSelector((state) => state.authReducer);
  const userLoading = authState.loading;
  const userEmail = authState.email;
  const userToken = authState.token;
  const userRegistration = authState.registration;
  const dispatch = useDispatch();
  const handleSignInSilently = () => {
    dispatch(loginSilently());
  };

  useEffect(() => {
    handleSignInSilently();
  }, []);

  if (userLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  if (!userToken) {
    return <AuthStack />;
  }
  if (userToken && userRegistration == true) {
    authState.registration = false;
    console.log("Itt kellene a defaultra dobjon");
    return <Default />;
  }

  return <TabNavigation />;
};
