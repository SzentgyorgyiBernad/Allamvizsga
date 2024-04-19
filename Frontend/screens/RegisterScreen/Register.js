import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/colors";
import CustomTextInput from "../../components/CustomTextInput";
import Button from "../../components/Button";

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
    } else handleError("", "email");

    if (!inputs.password) {
      handleError("Please input a password!", "password");
    } else if (inputs.password.length < 7) {
      handleError("The password is to short", "password");
    } else handleError("", "password");
    return validEmail;
  };

  const register = async () => {
    if (!validate()) {
      return;
    }

    try {
      const response = await fetch("http://192.168.0.191:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        handleError(data.error, "email");
        return;
      }
      handleError("", "email");
      navigation.navigate("Login");
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
                style={{
                  backgroundColor: COLORS.primary,
                  color: COLORS.primary,
                }}
                onPress={register}
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
