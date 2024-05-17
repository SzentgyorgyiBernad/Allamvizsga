import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/colors";
import Button from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../../Hooks/hooks";
import { logout } from "../../Redux/Auth/AuthSlice";
import MyCard from "../../components/Molecules/MyCard";
import { AntDesign } from "@expo/vector-icons";

const Menu = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    // console.log("Logout");
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("email");
    dispatch(logout());
    // console.log(AsyncStorage.getItsem("token"));
  };

  const renderAccounts = () => {};

  return (
    <LinearGradient
      style={{ flex: 1, alignItems: "center" }}
      colors={[COLORS.primary, COLORS.black]}
    >
      <View style={{ marginVertical: 22 }}></View>
      <MyCard style={{ width: "90%", height: 50 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignSelf: "center",
          }}
        >
          <View style={{ alignSelf: "center" }}>
            <AntDesign name="barschart" size={24} color="black" />
          </View>
          <View tyle={{ alignSelf: "center" }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 22,
                marginTop: 5,
                marginLeft: 6,
              }}
            >
              Overview
            </Text>
          </View>
        </View>
      </MyCard>

      <MyCard style={{ width: "90%", height: "70%", marginTop: 16 }}>
        <View></View>
        <View></View>
        <View></View>
      </MyCard>
      <Button
        title="Logout"
        onPress={handleLogout}
        style={{ width: "90%", marginTop: 16 }}
      />
    </LinearGradient>
  );
};

export default Menu;
