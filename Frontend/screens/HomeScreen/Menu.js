import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/colors";
import Button from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

const logout = async () => {
  console.log("Logout");
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("email");
  console.log(AsyncStorage.getItem("token"));
};

const Menu = ({ navigation }) => {
  return (
    <LinearGradient style={{ flex: 1 }} colors={[COLORS.primary, COLORS.black]}>
      <View style={{ flex: 1 }}>
        <View>
          <Text>Menu</Text>
          <Button
            title="Log out"
            style={{ color: COLORS.primary }}
            onPress={logout}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default Menu;
