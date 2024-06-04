import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStack } from "../StackNavigation/HomeStack";
import { IncomeStack } from "../StackNavigation/IncomeStack";
import { ExpenditureStack } from "../StackNavigation/ExpenditureStack";
import { Home, Download, Upload } from "react-native-feather";

export const TabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        component={HomeStack}
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Home
                stroke={focused ? "black" : "grey"}
                fill={focused ? "darkgrey" : "none"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        component={IncomeStack}
        name="Income"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Download
                stroke={focused ? "black" : "grey"}
                fill={focused ? "darkgrey" : "none"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        component={ExpenditureStack}
        name="Expenditure"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Upload
                stroke={focused ? "black" : "grey"}
                fill={focused ? "darkgrey" : "none"}
              />
            );
          },
        }}
      />
      {/* <Tab.Screen /> */}
    </Tab.Navigator>
  );
};
