import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text, StatusBar, Pressable } from "react-native";
import COLORS from "../../constants/colors";
import MyCard from "../../components/Molecules/MyCard";
import MyInput from "../../components/Molecules/MyInput";
import { useInvoiceCreateScreenLogic } from "./DefaultAccountCreate.Logic";
import { useAppDispatch } from "../../Hooks/hooks";
import { setAmount } from "../../Redux/InvoiceCreate/InvoiceCreateSlice";
import React from "react";

const StartBalanceScreen = ({ navigation }) => {
  const { handleInvoiceCreate } = useInvoiceCreateScreenLogic();
  const [amount, setNewAmount] = React.useState();
  const dispatch = useAppDispatch();

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
        <View style={{ marginVertical: 12 }}>
          <Text style={styles.text}>
            Enter your starting balance. This is the value you currently have.
          </Text>
        </View>
        <View>
          <MyInput
            style={styles.input}
            placeholder="Enter you start balance..."
            onChangeText={setNewAmount}
          ></MyInput>
        </View>

        <View
          style={{
            justifyContent: "flex-end",
            alignSelf: "center",
            width: 150,
            borderWidth: 1,
            borderRadius: 15,
            marginTop: 24,
          }}
        >
          <Pressable
            onPress={() => {
              dispatch(setAmount(amount));
              handleInvoiceCreate();
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 22,
                color: COLORS.black,
                fontWeight: "bold",
              }}
            >
              Next
            </Text>
          </Pressable>
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
