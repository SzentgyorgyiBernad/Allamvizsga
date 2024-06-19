import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import COLORS from "../../constants/colors";
import { useInvoiceCreateScreenLogic } from "./DefaultAccountCreate.Logic";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import MyDropDown from "../../components/Molecules/MyDropDown";
import MyInput from "../../components/Molecules/MyInput";

const DefaultAccountCreateScreen = ({navigation}) => {
  const { currencies, getAllCurrency, error, loading, handleAccountCreate, setAmount, setSelectedCurrency } = useInvoiceCreateScreenLogic();
  useEffect(() => {
    getAllCurrency();
  }, []);
  
  const renderCurrencies = () => {
    if (loading) {
      return <Text>Loading...</Text>;
    }

    if (error) {
      return <Text>Error loading currencies.</Text>;
    }

    if (currencies.values.length === 0) {
      return <Text>No currencies found.</Text>;
    }

    return (
        <MyDropDown items={currencies} setSelectedCurrency={setSelectedCurrency}/>
        );
  };

  return (
    <LinearGradient style={styles.gradient} colors={[COLORS.primary, COLORS.black]}>
      <View style={styles.card}>
        <ProgressSteps>
          <ProgressStep label="Currency">
            <View style={{alignItems: 'center', paddingVertical: 12}}>
              <Text style={{fontSize: 22}}>Select currency</Text>
              <Text style={{textAlign: 'center'}}>
                We will create a default, Main account for you, which you will not be able to delete.
              </Text>
                <View style={styles.currencyListContainer}>
                    {renderCurrencies()}
                    {console.log(currencies)}
                </View>
            </View>
            
            
          </ProgressStep>
          <ProgressStep label="Next Step" onSubmit={() => {handleAccountCreate();}}>
              <View style={{paddingHorizontal: 12, paddingVertical: 12}}>
                <Text style={{textAlign: 'center'}}>
                  Enter your starting balance. This is the value you currently have.
                </Text>
                <MyInput
                  style={styles.input}
                  placeholder="Enter you start balance..."
                  onChangeText={(value) => setAmount(value)}
                ></MyInput>
              </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </LinearGradient>
  );
};

export default DefaultAccountCreateScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    paddingHorizontal: 22,
    justifyContent: 'center',
    alignContent: 'center',
  },
  card: {
    borderRadius: 20,
    backgroundColor: COLORS.white,
    paddingVertical: 24,
    paddingHorizontal: 6,
    height: '60%',
  },
  currencyListContainer: {
    flex: 1,
  },
});
