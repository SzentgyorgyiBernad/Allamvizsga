import { View, Text, ScrollView, Pressable, Keyboard } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import CustomTextInput from "../components/CustomTextInput";
import Button from "../components/Button";

const Register = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({});

  const validate = () => {
    let validEmail = true;
    // Keyboard.dismiss();
    if (!inputs.email) {
      handleError("Please input your email!", "email");
      validEmail = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email!", "email");
    }

    if (!inputs.password) {
      handleError("Please input a password!", "password");
    } else if (inputs.password.length < 7) {
      handleError("The password is to short", "password");
    }
  };

  const register = async () => {
    try {
      const response = await fetch("http://192.168.0.191:8081/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  return (
    <LinearGradient style={{ flex: 1 }} colors={[COLORS.primary, COLORS.black]}>
      <SafeAreaView
        style={{
          flex: 1,
          marginHorizontal: 20,
          borderWidth: 2,
          marginVertical: 140,
          borderRadius: 20,
          backgroundColor: COLORS.white,
        }}
      >
        <ScrollView style={{ paddingHorizontal: 14 }}>
          <Text
            style={{
              color: COLORS.primary,
              fontSize: 26,
              fontWeight: "bold",
              marginTop: 26,
            }}
          >
            Create your account
          </Text>

          <Text
            style={{
              color: COLORS.primary,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            PLease enter your detals
          </Text>
          <View style={{ marginHorizontal: 12 }}>
            <CustomTextInput
              iconName="email-outline"
              label="Email"
              placeholder="Enter your email"
              error={errors.email}
              onFocus={() => {
                handleError(null, "email");
              }}
              onChangeText={(text) => handleOnChange(text, "email")}
            ></CustomTextInput>

            <CustomTextInput
              iconName="lock-outline"
              label="Password"
              placeholder="Enter your password"
              error={errors.password}
              onFocus={() => {
                handleError(null, "email");
              }}
              password
              onChangeText={(text) => handleOnChange(text, "password")}
            ></CustomTextInput>
          </View>

          <Button
            title="Register"
            style={{ backgroundColor: COLORS.primary, color: COLORS.primary }}
            onPress={validate}
          />
          <View
            style={{
              flexDirection: "row",
              marginTop: 8,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 14, color: COLORS.grey }}>
              Already have an acount?
            </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.grey,
                  fontWeight: "bold",
                  marginLeft: 4,
                }}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Register;
