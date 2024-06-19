import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStack } from "../StackNavigation/HomeStack";
import { IncomeStack } from "../StackNavigation/IncomeStack";
import { ExpenditureStack } from "../StackNavigation/ExpenditureStack";
import { Home, Download, Upload, Plus } from "react-native-feather";
import { AddNewTransactionStack } from "../StackNavigation/AddNewTransactionStack";
import { Text } from "react-native";

export const TabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontSize: 12, paddingBottom: 5 },
      }}
    >
      <Tab.Screen
        component={HomeStack}
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Home
                stroke={focused ? "black" : "grey"}
                fill={focused ? "darkgrey" : "none"}
                style={{ marginBottom: -10 }}
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
                style={{ marginBottom: -10 }}
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
                style={{ marginBottom: -10 }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        component={AddNewTransactionStack}
        name="Add"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Plus
                stroke={focused ? "black" : "grey"}
                fill={focused ? "darkgrey" : "none"}
                style={{ marginBottom: -10 }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
