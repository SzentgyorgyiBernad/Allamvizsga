import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/colors";
import CustomTextInput from "../../components/CustomTextInput";
import Button from "../../components/Button";
import { useLoginScreenLogic } from "../LoginScreen/LoginScreen.Logic";
import MyCard from "../../components/Molecules/MyCard";

const Login = ({ navigation }) => {
  const { email, setEmail, password, setPassword, error, handleLogin } =
    useLoginScreenLogic();

  return (
    <LinearGradient
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 22,
      }}
      colors={[COLORS.primary, COLORS.black]}
    >
      <View style={styles.card}>
        <View style={{ paddingHorizontal: 20, paddingTop: 12 }}>
          <Text
            style={{
              color: COLORS.primary,
              fontSize: 26,
              fontWeight: "bold",
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
          <View style={{ gap: 16, paddingVertical: 16 }}>
            <CustomTextInput
              iconName="email-outline"
              label="Email"
              placeholder="Enter your email"
              error={error && error.email}
              onChangetext={setEmail}
              value={email}
            ></CustomTextInput>

            <CustomTextInput
              iconName="lock-outline"
              label="Password"
              placeholder="Enter your password"
              onChangetext={setPassword}
              password
              value={password}
            ></CustomTextInput>
          </View>

          <Button
            title="Login"
            style={{
              backgroundColor: COLORS.primary,
              color: COLORS.primary,
              marginTop: 24,
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
      </View>
    </LinearGradient>
  );
};

export default Login;

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    backgroundColor: COLORS.white,
    paddingVertical: 24,
    paddingHorizontal: 6,
  },
});
