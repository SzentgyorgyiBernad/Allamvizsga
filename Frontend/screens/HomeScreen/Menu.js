import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/colors";
import Button from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../../Hooks/hooks";
import { logout } from "../../Redux/Auth/AuthSlice";

const Menu = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    // console.log("Logout");
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("email");
    dispatch(logout());
    // console.log(AsyncStorage.getItem("token"));
  };

  return (
    <LinearGradient style={{ flex: 1 }} colors={[COLORS.primary, COLORS.black]}>
      <View style={{ flex: 1 }}>
        <View>
          <Text>Menu</Text>
          <Button
            title="Log out"
            style={{ color: COLORS.primary }}
            onPress={handleLogout}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default Menu;
