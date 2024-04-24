import { createNativeStackNavigator } from "@react-navigation/native-stack";
//Just for debugging
import { StartBalanceScreen } from "../../screens";

export const Default = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        component={StartBalanceScreen}
        name="StartBalanceScreen"
        screenOptions={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
