import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../screens/LoginScreen/Login";
import Register from "../../screens/RegisterScreen/Register";

export const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        component={Login}
        name="Login"
        screenOptions={{ headerShown: false }}
      />
      <Stack.Screen
        component={Register}
        name="Register"
        screenOptions={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
