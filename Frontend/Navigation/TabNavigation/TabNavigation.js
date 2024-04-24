import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStack } from "../StackNavigation/HomeStack";

export const TabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen component={HomeStack} name="HomeStack" />
      {/* <Tab.Screen /> */}
      {/* <Tab.Screen /> */}
      {/* <Tab.Screen /> */}
    </Tab.Navigator>
  );
};
