import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/colors";
import CustomTextInput from "../../components/CustomTextInput";
import Button from "../../components/Button";
import { useLoginScreenLogic } from "../LoginScreen/LoginScreen.Logic";

export default Login = ({ navigation }) => {
  const { email, setEmail, password, setPassword, handleLogin } =
    useLoginScreenLogic();
  const [errors, setErrors] = React.useState({});

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
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
                  onChangeText={setEmail}
                  onFocus={() => {
                    handleError(null, "email");
                  }}
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
                  onChangeText={setPassword}
                ></CustomTextInput>
              </View>

              <Button
                title="Login"
                style={{
                  backgroundColor: COLORS.primary,
                  color: COLORS.primary,
                }}
                onPress={handleLogin}
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
