import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Menu } from "../../screens";
import AllTransactionsScreen from "../../screens/AllTransactions/AllTransactionsScreen";

export const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        component={Menu}
        name="Menu"
        screenOptions={{ headerShown: false }}
      />
      <Stack.Screen
        component={AllTransactionsScreen}
        name="AllTransactionsScreen"
        screenOptions={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
