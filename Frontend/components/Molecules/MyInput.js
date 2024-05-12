import React from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native";
import COLORS from "../../constants/colors";

const MyInput = ({ value, onChangeText, placeholder, secure, error }) => {
  return (
    <View>
      <TextInput
        style={[styles.input, error && styles.error]}
        placeholder={placeholder}
        onChangeText={(text) => onChangeText(text)}
        value={value}
        secureTextEntry={secure}
      />
    </View>
  );
};

export default MyInput;

const styles = StyleSheet.create({
  input: {
    borderRadius: 15,
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: 12,
  },
  error: {
    borderColor: COLORS.red,
  },
});
