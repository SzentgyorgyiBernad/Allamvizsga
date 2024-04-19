import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../screens/LoginScreen/Login";
import Register from "../../screens/RegisterScreen/Register";

export const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen component={Register} name="Register" />
    </Stack.Navigator>
  );
};
