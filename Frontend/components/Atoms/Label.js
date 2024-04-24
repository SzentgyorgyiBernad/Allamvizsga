import { Text, StyleSheet } from "react-native";
import React from "react";
import COLORS from "../../constants/colors";

const Label = ({ text }) => {
  console.log(text);
  return <Text style={styles.label}> {text} </Text>;
};

export default Label;

const styles = StyleSheet.create({
  label: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 500,
  },
});
