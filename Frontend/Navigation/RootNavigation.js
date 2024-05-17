import { useEffect } from "react";
import { TabNavigation } from "./TabNavigation/TabNavigation";
import { ActivityIndicator, View } from "react-native";
import { AuthStack } from "./StackNavigation/AuthStack";
import { Default } from "./StackNavigation/Default";
import { useDispatch, useSelector } from "react-redux";
import { loginSilently } from "../Redux/Auth/AuthSlice";
import { accountSelector } from "../Redux/AccountCreate/AccountCreateSlice";
import { useAppSelector } from "../Hooks/hooks";

export const RootNavigation = () => {
  const authState = useSelector((state) => state.authReducer);
  const accountState = useAppSelector(accountSelector);
  const userLoading = authState.loading;
  const userToken = authState.token;
  const userRegistration = authState.registration;
  const dispatch = useDispatch();
  const handleSignInSilently = () => {
    dispatch(loginSilently());
  };

  useEffect(() => {
    dispatch(loginSilently());
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
    // console.log("Itt kellene a defaultra dobjon");
    return <Default />;
  }
  if ((accountState.final = true)) {
    accountState.final = false;
    return <TabNavigation />;
  }

  return <TabNavigation />;
};
