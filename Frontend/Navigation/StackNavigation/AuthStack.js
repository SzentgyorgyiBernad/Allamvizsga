import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../screens/LoginScreen/Login";
import Register from "../../screens/RegisterScreen/Register";
//Just for debugging
import { StartBalanceScreen } from "../../screens";

export const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        component={Login}
        name="Login"
        screenOptions={{ headerShown: false }}
      />
      <Stack.Screen component={Register} name="Register" />
    </Stack.Navigator>
  );
};
