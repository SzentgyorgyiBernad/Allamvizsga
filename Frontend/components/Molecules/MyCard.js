import { View, StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const MyCard = (props) => {
  return <View style={[Styles.card, props.style]}>{props.children}</View>;
};

export default MyCard;

const Styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: COLORS.black,
    backgroundColor: COLORS.white,
  },
});
