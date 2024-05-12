import { createNativeStackNavigator } from "@react-navigation/native-stack";
//Just for debugging
import {
  StartBalanceScreen,
  DefaultCurrencyScreen,
  DefaultStartBalanceScreen,
} from "../../screens";

export const Default = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        component={DefaultCurrencyScreen}
        name="DefaultCurrencyScreen"
        screenOptions={{ headerShown: false }}
      />
      <Stack.Screen
        component={DefaultStartBalanceScreen}
        name="DefaultStartBalanceScreen"
        screenOptions={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
