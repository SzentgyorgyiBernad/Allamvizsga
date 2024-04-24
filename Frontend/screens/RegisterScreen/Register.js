import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/colors";
import CustomTextInput from "../../components/CustomTextInput";
import Button from "../../components/Button";
import { useRegisterScreenLogic } from "./RegisterScreen.Logic";

const Register = ({ navigation }) => {
  const { email, setEmail, password, setPassword, error, handleRegister } =
    useRegisterScreenLogic();

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
                  error={error.email}
                  // onFocus={() => {
                  //   handleError(null, "email");
                  // }}
                  onChangetext={setEmail}
                  value={email}
                ></CustomTextInput>

                <CustomTextInput
                  iconName="lock-outline"
                  label="Password"
                  placeholder="Enter your password"
                  error={error.password}
                  password
                  onChangetext={setPassword}
                  value={password}
                ></CustomTextInput>
              </View>

              <Button
                title="Register"
                style={{
                  backgroundColor: COLORS.primary,
                  color: COLORS.primary,
                }}
                onPress={handleRegister}
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
            </View>
          </ScrollView>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Register;
