import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import COLORS from "../../constants/colors";
import MyCard from "../../components/Molecules/MyCard";
import MyInput from "../../components/Molecules/MyInput";

const StartBalanceScreen = (navigate) => {
  return (
    <LinearGradient
      style={{ flex: 1, justifyContent: "center" }}
      colors={[COLORS.primary, COLORS.black]}
    >
      <MyCard
        style={{
          marginHorizontal: 16,
          paddingVertical: 24,
          paddingHorizontal: 24,
        }}
      >
        <View>
          <Text style={styles.text}>
            {" "}
            We will create a default account for you: which you will not be able
            to delete. Please enter your starting balance (The amount of money
            you have now).
          </Text>
        </View>
        <View>
          <MyInput style={styles.input}></MyInput>
        </View>
      </MyCard>
      <StatusBar style="light" backgroundColor={COLORS.primary} />
    </LinearGradient>
  );
};

export default StartBalanceScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    textAlign: "center",
  },
  input: {
    placeholder: "0 RON",
  },
});
