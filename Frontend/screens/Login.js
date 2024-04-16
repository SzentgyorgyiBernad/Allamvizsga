import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import CustomTextInput from "../components/CustomTextInput";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({});

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const login = async () => {
    try {
      const response = await fetch("http://192.168.0.191:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await response.json();

      if (!response.ok) {
        handleError(data.error, "password");
      }
      storeData(data.token);
      navigation.navigate("Menu");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("token", value);
    } catch (error) {
      console.error("Hiba történt az adatok tárolása közben:", e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");

      console.log("amit kap", value);
      if (value !== null) {
        return value;
      } else {
        console.log("Nincs érték a megadott kulcshoz.");
        return null;
      }
    } catch (e) {
      console.error("Hiba történt az adatok kiolvasása közben:", e);
      return null;
    }
  };

  return (
    <LinearGradient style={{ flex: 1 }} colors={[COLORS.primary, COLORS.black]}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View
          style={{
            borderWidth: 1,
            borderRadius: 20,
            borderColor: COLORS.black,
            backgroundColor: COLORS.white,
            marginHorizontal: 16,
            paddingVertical: 24,
          }}
        >
          <ScrollView
            style={{
              paddingHorizontal: 14,
            }}
          >
            <View>
              <Text
                style={{
                  color: COLORS.primary,
                  fontSize: 26,
                  fontWeight: "bold",
                  marginTop: 26,
                }}
              >
                Welcome back!
              </Text>

              <Text
                style={{
                  color: COLORS.primary,
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Login to your account!
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
                title="Login"
                style={{
                  backgroundColor: COLORS.primary,
                  color: COLORS.primary,
                }}
                onPress={login}
              />
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 8,
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: COLORS.grey }}>
                  Don't have an account!
                </Text>
                <Pressable onPress={() => navigation.navigate("Register")}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: COLORS.grey,
                      fontWeight: "bold",
                      marginLeft: 4,
                    }}
                  >
                    Register
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Login;
