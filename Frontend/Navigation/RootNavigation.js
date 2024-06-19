import { useEffect } from "react";
import { TabNavigation } from "./TabNavigation/TabNavigation";
import { ActivityIndicator, View } from "react-native";
import { AuthStack } from "./StackNavigation/AuthStack";
import { DefaultAccountCreateStack } from "./StackNavigation/DefaultAccountCreateStack";
import { useDispatch, useSelector } from "react-redux";
import { loginSilently } from "../Redux/Auth/AuthSlice";

export const RootNavigation = () => {
  const authState = useSelector((state) => state.authReducer);
  const accountCreateState = useSelector((state) => state.accountCreateReducer);
  const userLoading = authState.loading;
  const user = authState.email;
  const userRegistration = authState.registration;
  const final = accountCreateState.final;
  const dispatch = useDispatch();

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

  if (!user) {
    return <AuthStack />;
  }
  if (final == true) {
    return <TabNavigation />;
  }
  if (user && userRegistration == true) {
    return <DefaultAccountCreateStack />;
  }
  return <TabNavigation />;
};
