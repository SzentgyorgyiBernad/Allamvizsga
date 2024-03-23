import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const Button = (props) => {
  const textColor = props.color || COLORS.black;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        ...styles.button,
        ...{ backgroundColor: COLORS.white },
        ...props.style,
      }}
      onPress={props.onPress}
    >
      <Text
        style={{
          color: textColor,
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.black,
    marginVertical: 12,
  },
});

export default Button;
