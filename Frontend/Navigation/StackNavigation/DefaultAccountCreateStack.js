import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DefaultAccountCreateScreen from "../../screens/DefaultAccountCreateScreen/DefaultAccountCreateScreen";

export const DefaultAccountCreateStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        component={DefaultAccountCreateScreen}
        name="DefaultAccountCreateScreen"
        screenOptions={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
