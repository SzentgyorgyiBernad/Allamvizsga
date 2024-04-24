import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Menu } from "../../screens";

export const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Menu} name="Menu" />
    </Stack.Navigator>
  );
};
