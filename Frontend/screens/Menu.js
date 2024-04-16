import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import Button from "../components/Button";

const Menu = ({ navigation }) => {
  return (
    <LinearGradient style={{ flex: 1 }} colors={[COLORS.primary, COLORS.black]}>
      <View style={{ flex: 1 }}>
        <View>
          <Image
            source={require("../assets/business-arrow.png")}
            style={{
              width: 150,
              height: 150,
              borderRadius: 25,
              position: "absolute",
              top: 24,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "-15deg" },
              ],
            }}
          />
        </View>
        <View>
          <Text>Menu</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Menu;
