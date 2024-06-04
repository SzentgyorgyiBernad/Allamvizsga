import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const MyDropDown = ({ items, setSelectedCurrency }) => {
  const [selectedValue, setSelectedValue] = useState(items.values[0]);
  console.log("items", items.values[0]);

  const handleValueChange = (itemValue, itemIndex) => {
    setSelectedValue(itemValue);
    setSelectedCurrency(itemValue);
  };
  // console.log("items", items);

  return (
    <View style={styles.dropDown}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={handleValueChange}
      >
        {items &&
          items.values.map((item, index) => (
            // console.log("item", item),
            <Picker.Item key={index} label={item} value={item} />
          ))}
      </Picker>
    </View>
  );
};

export default MyDropDown;

const styles = StyleSheet.create({
  dropDown: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
