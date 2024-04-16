import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Register } from "../../screens";

export const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen component={Register} name="Register" />
    </Stack.Navigator>
  );
};
