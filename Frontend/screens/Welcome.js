import { View, Text, Image, RootTagContext, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import Button from "../components/Button";

const Welcome = ({ navigation }) => {
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

        {/* Content */}
        <View
          style={{
            top: 400,
            width: "100%",
            position: "absolute",
            paddingHorizontal: 24,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: 800,
              color: COLORS.white,
              marginVertical: 6,
            }}
          >
            Start managing your money wisely
          </Text>

          <View style={{ marginVertical: 6 }}>
            <Text
              style={{ fontSize: 16, color: COLORS.white, marginVertical: 6 }}
            >
              Track your expenses and income
            </Text>

            <Text style={{ fontSize: 16, color: COLORS.white }}>
              Plan your budget ahead
            </Text>
          </View>
          <Button
            onPress={() => navigation.navigate("Register")}
            title="Let's start"
            style={{ color: COLORS.black, marginTop: 28 }}
          />
          <View
            style={{
              flexDirection: "row",
              marginTop: 8,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 14, color: COLORS.white }}>
              Already have an acount?
            </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.white,
                  fontWeight: "bold",
                  marginLeft: 4,
                }}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Welcome;
