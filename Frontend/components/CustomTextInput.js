import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import COLORS from "../constants/colors";
import { Mail, Lock } from "react-native-feather";

const CustomTextInput = ({
  label,
  error,
  iconName,
  password,
  onChangetext,
  value,
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);

  const Icon = (iconName) => {
    if (iconName === "email") {
      return <Mail style={{ fontSize: 12, paddingLeft: 4 }} />;
    } else if (iconName === "lock") {
      return <Lock style={{ fontSize: 22, paddingLeft: 4 }} />;
    }
  };

  return (
    <View>
      <Text style={{ marginLeft: 10, fontSize: 18, color: COLORS.primary }}>
        {label}
      </Text>

      <View style={styles.container}>
        {Icon(iconName)}
        <TextInput
          style={{ width: "100%" }}
          secureTextEntry={hidePassword}
          {...props}
          placeholderTextColor={COLORS.grey}
          onChangeText={(text) => {
            onChangetext(text);
          }}
          value={value}
        ></TextInput>
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            style={{ marginLeft: "auto", marginRight: 8, fontSize: 20 }}
          />
        )}
      </View>
      {error && (
        <Text style={{ color: COLORS.red, marginLeft: 12 }}> {error} </Text>
      )}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    height: 40,
    borderWidth: 2,
    borderRadius: 15,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    borderColor: COLORS.primary,
    // borderColor: error ? COLORS.red : COLORS.primary,
  },
});
