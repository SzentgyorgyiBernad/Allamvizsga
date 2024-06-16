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
  // console.log("final lekeresekor", final);
  const dispatch = useDispatch();
  // console.log("userToken", userToken);

  useEffect(() => {
    // console.log("useEffect");
    dispatch(loginSilently());
  }, []);

  if (userLoading) {
    // console.log("userLoading");
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  if (!user) {
    // console.log("nincs userToken");
    return <AuthStack />;
  }
  if (final == true) {
    // console.log("Itt megy a menube");
    return <TabNavigation />;
  }
  if (user && userRegistration == true) {
    // console.log("user van, es atdob a main account create screenre");
    return <DefaultAccountCreateStack />;
  }
  // console.log("Itt megy a menube");
  return <TabNavigation />;
};
