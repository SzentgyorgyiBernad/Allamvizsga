import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";
import COLORS from "../../constants/colors";

const MyInput = ({ text, setText, placeholder, secure, error }) => {
  return (
    <TextInput
      style={[styles.input, error && styles.error]}
      placeholder={placeholder}
      onChangeText={setText}
      value={text}
      secureTextEntry={secure}
    />
  );
};

export default MyInput;

const styles = StyleSheet.create({
  input: {
    borderRadius: 15,
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  error: {
    borderColor: COLORS.red,
  },
});
