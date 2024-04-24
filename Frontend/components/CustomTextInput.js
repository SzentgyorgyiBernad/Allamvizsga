import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import COLORS from "../constants/colors";
import Label from "./Atoms/Label";
import MyInput from "./Molecules/MyInput";

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

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ marginLeft: 10, fontSize: 18, color: COLORS.primary }}>
        {label}
      </Text>

      <View
        style={{
          height: 40,
          borderWidth: 2,
          borderRadius: 15,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 12,
          borderColor: error ? COLORS.red : COLORS.primary,
        }}
      >
        <Icon
          name={iconName}
          style={{
            alignItems: "center",
            marginHorizontal: 8,
            fontSize: 24,
            color: COLORS.primary,
          }}
        ></Icon>
        <TextInput
          style={{ width: "75%" }}
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
