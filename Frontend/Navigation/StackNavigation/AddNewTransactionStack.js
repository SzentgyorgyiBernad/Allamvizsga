import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddNewTransactionScreen from "../../screens/AddNewTransactionScreen/AddNewTransactionScreen";

export const AddNewTransactionStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        component={AddNewTransactionScreen}
        name="AddNewTransactionScreen"
        screenOptions={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
