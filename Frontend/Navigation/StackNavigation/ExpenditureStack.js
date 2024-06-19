import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExpenditureScreen from "../../screens/ExpenditureScreen/ExpenditureScreen";

export const ExpenditureStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        component={ExpenditureScreen}
        name="ExpenditureScreen"
        screenOptions={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
