import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IncomeScreen from "../../screens/IncomeScreen/IncomeScren";

export const IncomeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        component={IncomeScreen}
        name="IncomeScreen"
        screenOptions={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
