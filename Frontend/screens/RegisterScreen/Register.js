import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
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
          <View style={{ gap: 16, paddingVertical: 16 }}>
            <CustomTextInput
              iconName="email-outline"
              label="Email"
              placeholder="Enter your email"
              error={error.email}
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
      </View>
    </LinearGradient>
  );
};

export default Register;

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    backgroundColor: COLORS.white,
    paddingVertical: 24,
    paddingHorizontal: 6,
  },
});
