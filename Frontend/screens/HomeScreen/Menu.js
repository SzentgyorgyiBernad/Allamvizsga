import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  Dimensions,
  Animated,
  processColor,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/colors";
import Button from "../../components/Button";
import { useMenuScreenLogic } from "./MenuScreen.logic";
import { GroupByChart } from "react-native-charts-wrapper";

const { width } = Dimensions.get("window");

const Menu = ({ navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const drawerAnimation = useRef(new Animated.Value(-250)).current;
  const [myData, setMyData] = React.useState({});
  const [xAxis, setXAxis] = React.useState({});
  const {
    accounts,
    transactionsByMonths,
    selectedAccount,
    transactions,
    getAccounts,
    onLogout,
    onSetSelectedAccount,
    getLastSixMonthsIncome,
    getLastThreeTransactions,
    setSelectedDate,
  } = useMenuScreenLogic();
  useEffect(() => {
    console.log("UseEffect hivodik");
    getAccounts();
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    const months = Object.keys(transactionsByMonths);
    const positives = months.map((month) => ({
      y: transactionsByMonths[month].positives,
    }));
    const negatives = months.map((month) => ({
      y: transactionsByMonths[month].negatives,
    }));

    setMyData({
      dataSets: [
        {
          values: positives,
          label: "Income",
          config: {
            color: processColor("green"),
          },
        },
        {
          values: negatives,
          label: "Expenditure",
          config: {
            color: processColor("red"),
          },
        },
      ],
      config: {
        barWidth: 0.3,
        group: {
          fromX: 0,
          groupSpace: 0.4,
          barSpace: 0.1,
        },
      },
    });

    setXAxis({
      valueFormatter: months,
      granularityEnabled: true,
      granularity: 1,
      axisMaximum: months.length,
      axisMinimum: 0,
      centerAxisLabels: true,
    });
  }, [transactionsByMonths]);

  const flatListRef = React.useRef();

  const handleScorll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    onSetSelectedAccount(accounts[index]?.id);
  };

  const renderChart = (data) => {
    return (
      <View>
        <Text></Text>
      </View>
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
        <Text>{transactionsByMonths.values[0]}</Text>
        {/* <View style={styles.chart}>{renderChart(transactionsByMonths)}</View> */}
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
});
