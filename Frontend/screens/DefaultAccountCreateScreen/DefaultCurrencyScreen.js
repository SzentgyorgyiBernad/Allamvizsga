import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text, StatusBar, Pressable } from "react-native";
import React from "react";
import COLORS from "../../constants/colors";
import MyCard from "../../components/Molecules/MyCard";
import MyDropDown from "../../components/Molecules/MyDropDown";
import { useEffect } from "react";
import { useInvoiceCreateScreenLogic } from "./DefaultAccountCreate.Logic";
import { useAppDispatch } from "../../Hooks/hooks";
import { setSelectedCurrency } from "../../Redux/InvoiceCreate/InvoiceCreateSlice";

const DefaultCurrencyScreen = ({ navigation }) => {
  const { allCurrency, getAllCurrency, error, handleInvoiceCreate } =
    useInvoiceCreateScreenLogic();
  const [isLoading, setIsLoading] = React.useState(true);
  // const [currency, setCurrency] = React.useState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("useEffect");
    getAllCurrency().then(() => setIsLoading(false));
  }, []);

  const renderCurrencies = () => {
    if (isLoading) {
      return <Text>Loading...</Text>;
    }
    return (
      <View style={{ marginVertical: 16, paddingBottom: 12 }}>
        <MyDropDown
          items={allCurrency}
          setSelectedCurrency={(value) => {
            dispatch(setSelectedCurrency(value));
          }}
        ></MyDropDown>
      </View>
    );
  };

  return (
    <LinearGradient
      style={{ flex: 1, justifyContent: "center" }}
      colors={[COLORS.primary, COLORS.black]}
    >
      <MyCard
        style={{
          paddingTop: 42,
          paddingBottom: 48,
          paddingHorizontal: 24,
          marginHorizontal: 20,
        }}
      >
        <View style={{ paddingBottom: 24 }}>
          <Text style={{ fontSize: 32, textAlign: "center" }}> Add new</Text>
        </View>

        <View
          style={{
            marginHorizontal: 16,
            marginBottom: 12,
            // borderBottomWidth: 1,
            paddingBottom: 12,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 12 }}>
            We will create a default, Main account for you, which you will not
            be able to delete.
          </Text>
        </View>

        <View style={{ borderBottomWidth: 1, marginHorizontal: 16 }}>
          <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 12 }}>
            Select your default currency
          </Text>

          {renderCurrencies()}
        </View>

        {/* <View style={{ marginVertical: 12, marginHorizontal: 16 }}>
          <Text style={{ textAlign: "center", fontSize: 20 }}>
            Enter your starting balance
          </Text>
        </View>
        <View>
          <MyInput
            style={styles.input}
            placeholder="Enter you start balance..."
            onChangeText={setAmount}
          ></MyInput>
          <Text style={{ textAlign: "center", fontSize: 12 }}>
            Note: This is the value you currently have.
          </Text>
        </View> */}

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
            onPress={async () => {
              // dispatch(setSelectedCurrency(currency));
              navigation.navigate("DefaultStartBalanceScreen");
            }}
          >
            <Text
              style={{
                paddingBottom: 2,
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

export default DefaultCurrencyScreen;

const styles = StyleSheet.create({});
