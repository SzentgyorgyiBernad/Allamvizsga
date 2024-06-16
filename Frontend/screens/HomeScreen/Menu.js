import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  Dimensions,
  Modal,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import MyDropDown from "../../components/Molecules/MyDropDown";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/colors";
import Button from "../../components/Button";
import MyInput from "../../components/Molecules/MyInput";
import { useMenuScreenLogic } from "./MenuScreen.logic";
import { BarChart } from "react-native-gifted-charts";

const { width } = Dimensions.get("window");

const Menu = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);

  const {
    accounts,
    transactionsByMonths,
    selectedAccount,
    transactions,
    currencies,
    getAccounts,
    onLogout,
    onSetSelectedAccount,
    getLastSixMonthsIncome,
    getLastThreeTransactions,
    getAllCurrency,
    loading,
    error,
    selectedCurrency,
    setSelectedCurrency,
    handleAccountCreate,
    setAmount,
    setName,
  } = useMenuScreenLogic();
  useEffect(() => {
    getAccounts();
    getAllCurrency();
  }, []);

  useEffect(() => {
    if (!accounts) {
      return;
    }
    if (accounts.length > 0) {
      onSetSelectedAccount(accounts[0]);
    }
  }, [accounts]);

  useEffect(() => {
    if (selectedAccount) {
      getLastSixMonthsIncome();
      getLastThreeTransactions();
    }
  }, [selectedAccount]);

  const flatListRef = React.useRef();

  const handleScorll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    onSetSelectedAccount(accounts[index]?.id);
  };

  const createRow = (income, expenditure, label) => {
    return [
      {
        value: income,
        label: label,
        frontColor: COLORS.primary,
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: { color: "gray" },
        frontColor: COLORS.primary,
      },
      { value: expenditure, frontColor: COLORS.red },
    ];
  };

  const customFormatter = (value) => {
    if (value === 0) return "0";
    if (value === 2500) return "2.5k";
    if (value === 5000) return "5k";
    if (value === 7500) return "7.5k";
    if (value === 10000) return "10k";
    return value;
  };

  const renderChart = () => {
    if (!transactionsByMonths) {
      return null;
    }

    const months = Object.keys(transactionsByMonths.values);

    const positives = months.map((month) => ({
      y: transactionsByMonths.values[month].positives,
    }));
    const negatives = months.map((month) => ({
      y: transactionsByMonths.values[month].negatives,
    }));
    let barData = [];
    positives.forEach((item, index) => {
      const row = createRow(item.y, -negatives[index].y, months[index]);
      barData = barData.concat(row);
    });

    return (
      <View style={{ paddingTop: 12, paddingHorizontal: 4 }}>
        <BarChart
          data={barData}
          barWidth={8}
          spacing={24}
          roundedTop
          roundedBottom
          hideRules
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{ color: "gray" }}
          noOfSections={4}
          maxValue={10000}
          xAxisLabelRotation={90}
          yAxisLabelContainerStyle={customFormatter}
        />
      </View>
    );
  };

  const renderCurrencies = () => {
    if (loading) {
      return <Text>Loading...</Text>;
    }

    // if (error) {
    //   return <Text>Error loading currencies.</Text>;
    // }
    // console.log("currencies", currencies);

    // if (currencies.length === 0) {
    //   return <Text>No currencies found.</Text>;
    // }
    return (
      <MyDropDown
        items={currencies}
        setSelectedCurrency={setSelectedCurrency}
      />
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              textAlignVertical: "center",
            }}
          >
            {item.name}
          </Text>

          <View style={styles.dotStyle} />
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              textAlignVertical: "center",
              top: 2,
            }}
          >
            {item.currency.name}
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 22 }}>{item.amount} </Text>
          <Text
            style={{
              fontSize: 12,
              textAlignVertical: "center",
            }}
          >
            {item.currency.name.split(" ")[1]}
          </Text>
        </View>
        {/* <Text>{transactionsByMonths[0]}</Text> */}
        <View style={styles.chart}>{renderChart()}</View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 12,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: COLORS.red,
                width: 6,
                height: 6,
                borderRadius: 15,
                marginRight: 5,
              }}
            ></View>
            <Text style={{ marginRight: 20 }}>Expenditure</Text>
            <View
              style={{
                backgroundColor: COLORS.primary,
                width: 6,
                height: 6,
                borderRadius: 15,
                marginRight: 5,
              }}
            ></View>
            <Text>Income</Text>
          </View>
          <Pressable
            onPress={() => {
              setVisible(true);
            }}
            style={{
              backgroundColor: COLORS.grey,
              paddingVertical: 2,
              paddingHorizontal: 6,
              borderRadius: 5,
              marginLeft: 16,
            }}
          >
            <Text style={{ color: COLORS.white }}>New account</Text>
          </Pressable>
        </View>
        <Modal
          style={{ backgroundColor: COLORS.white }}
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={() => {
            setVisible(!visible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ fontSize: 22 }}>Add New Account</Text>
              <View>
                <ProgressSteps>
                  <ProgressStep label="Currency">
                    <View style={{ alignItems: "center", paddingVertical: 12 }}>
                      <Text style={{ fontSize: 22 }}>Select currency</Text>
                      <Text style={{ textAlign: "center" }}>
                        We will create a default, Main account for you, which
                        you will not be able to delete.
                      </Text>
                      <View style={styles.currencyListContainer}>
                        {renderCurrencies()}
                        {/* {console.log(currencies)} */}
                      </View>
                    </View>
                  </ProgressStep>
                  <ProgressStep
                    label="Next Step"
                    onSubmit={() => {
                      handleAccountCreate();
                    }}
                  >
                    <View
                      style={{ paddingHorizontal: 12, paddingVertical: 12 }}
                    >
                      <Text style={{ textAlign: "center" }}>
                        Enter your starting balance. This is the value you
                        currently have.
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

              <Pressable onPress={() => setVisible(false)}>
                <Text>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const renderLastThreeTransaction = (item) => {
    const textColor = item.item.amount > 0 ? COLORS.primary : COLORS.red;
    const amountText =
      item.item.amount > 0 ? `+${item.item.amount}` : item.item.amount;

    return (
      <View style={{ marginBottom: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 18 }}>{item.item.income_type.name}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 18, color: textColor }}>
              {amountText}
              <Text style={{ fontSize: 12 }}>
                {selectedAccount.currency.name.split(" ")[1]}
              </Text>
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ fontSize: 12 }}>
            {item.item.date.split("T")[0].split("-").join(". ")}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        paddingTop: 20,
      }}
      colors={[COLORS.primary, COLORS.black]}
    >
      <View style={styles.titleCard}>
        <View style={{ width: 130, paddingLeft: 16 }}>
          <Pressable onPress={() => onLogout()}>
            <Text>Log out</Text>
          </Pressable>
        </View>

        <Text style={{ fontSize: 22 }}>Overview</Text>
      </View>

      <View style={styles.accountCard}>
        <FlatList
          data={accounts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScorll}
          ref={flatListRef}
        ></FlatList>
      </View>

      <View style={styles.bottomCard}>
        <Text style={{ fontSize: 22, paddingBottom: 8 }}>
          Recent transactions
        </Text>
        <FlatList
          data={transactions.values}
          renderItem={renderLastThreeTransaction}
          keyExtractor={(item) => item.id}
        ></FlatList>
      </View>
    </LinearGradient>
  );
};

export default Menu;

const styles = StyleSheet.create({
  card: {
    width: width * 0.839,
    position: "relative",
    // justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 20,
  },
  titleCard: {
    position: "relative",
    top: 0,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    height: 50,
    width: "90%",
    borderRadius: 20,
    flexDirection: "row",
  },
  bottomCard: {
    width: "90%",
    height: 220,
    position: "relative",
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 20,
  },
  accountCard: {
    width: "90%",
    height: "60%",
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginVertical: 8,
    padding: 12,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.black,
    alignSelf: "center",
    marginHorizontal: 10,
  },
  chart: {
    width: "100%",
    height: 300,
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    marginTop: 20,
    borderWidth: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%", // Szélesség beállítása
    height: 400, // Magasság beállítása
  },
});
