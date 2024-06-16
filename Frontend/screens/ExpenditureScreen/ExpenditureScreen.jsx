import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native'
import React, { useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import COLORS from '../../constants/colors'
import { useExpenditureScreenLogic } from './ExpenditureScreen.logic'
import { ArrowUpRight,ArrowDownRight  } from 'react-native-feather'

const ExpenditureScreen = () => {
  const {
    expenditures,
    totalAmount,
    plannedExpenditures,
    loading,
    error,
    compareToLastMonthPercentage,
    selectedAccount,
    onLogout,
    getExpenditures,
    getMyPlannedExpenditures,
    getCompareToLastMonth
    } = useExpenditureScreenLogic();

    useEffect(() => {
      getExpenditures()
      getMyPlannedExpenditures()
      getCompareToLastMonth()
    }, []);

    const renderPercentage = (data) => {
      if(data === 0) {
        return (
          <View style={{flexDirection: 'row', gap: 8, width: "90%", height: 50, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'black', fontSize: 18}}>0%</Text>
          </View>
        )
      }
      if(data > 0) {
        return (
          <View style={{flexDirection: 'row', gap: 8, width: "90%", height: 50, justifyContent: 'center', alignItems: 'center'}}>
            <ArrowUpRight style={{color: 'green', }}/>
            <Text style={{color: 'green', fontSize: 18}}>+{data}%</Text>
            
          </View>
        )
      }
      return (
        <View style={{flexDirection: 'row', gap: 8, width: "90%", height: 50, justifyContent: 'center', alignItems: 'center'}}>
          <ArrowDownRight style={{color: 'red', }}/>
          <Text style={{color: 'red', fontSize: 18}}>-{data}%</Text> 
        </View>
      )
    }

    const renderExpenditureChart = () => {
      return (
        <View style={{ flexDirection: "row", gap: 8, width: "90%" }}>
          <View style={{borderWidth: 3, borderColor: COLORS.red, width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 16, color: COLORS.red }}>{totalAmount}</Text>
            <Text style={{fontSize: 10, color: COLORS.red }}>{selectedAccount.currency.name.split(" ")[1]}</Text>
          </View>
          <View>
            <Text> Compared to last month</Text>
            {renderPercentage(compareToLastMonthPercentage.values)}
          </View>
        </View>
      )
    }

    const renderExpenditure = () => {
      if (loading) {
        return <Text>Loading...</Text>;
      }
      if(expenditures.length === 0) {
        return <Text>No transactions found yet!</Text>
      }
      const firstThreeTransactions = expenditures.slice(0, 3);
      // console.log("firstThreeTransactions", firstThreeTransactions[0]);
      return firstThreeTransactions.map((item, index) => (
        <View key={index} style={{ paddingBottom: 6 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ height: 6, width: 6, backgroundColor: COLORS.red, borderRadius: 15, marginRight: 8 }}></View>
            <Text>{item.income_type.name}</Text>
          </View>
          <Text style={{ color: COLORS.red}}>{item.amount}</Text>
        </View>
        <View style={{ paddingLeft: 12, flexDirection: 'row', justifyContent: 'space-between'  }}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 10, width: 150 }}>Note: {item.note}</Text>
          <Text style={{fontSize: 10}}>{item.date.split("T")[0].split("-").join(". ")}</Text>
        </View>
      </View>
      ));
    }

  return (
    <LinearGradient colors={[COLORS.primary, COLORS.black]} style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      paddingTop: 20
    }} >
      <View style={styles.titleCard}>
        <View style={{ width: 130, paddingLeft: 16 }}>
          <Pressable onPress={() => onLogout()}>
            <Text>Log out</Text>
          </Pressable>
        </View>

        <Text style={{ fontSize: 22 }}>Expenditure</Text>
      </View>
      <View style={styles.incomeCard}>
        <View>
          <Text style={{fontSize: 28}}>Statistics</Text>
          <Text style={{fontSize: 12}}>How much and what did you spend on this current month?</Text>
        </View>
        <View style={{ paddingVertical: 8}}> 
          {renderExpenditureChart()}
        </View>
        <View style={{borderTopWidth: 1, width: '80%'}}></View>
        <View style={{paddingVertical: 12, paddingHorizontal: 18}}>
          <View style={{flexDirection: 'row', width: 280}}>
            <Text style={{fontSize: 28}}>Earnings</Text>
            <View style={{justifyContent: 'center', alignItems: 'flex-end', left: 100}}>
              <Pressable 
                onPress
                style={{borderRadius: 15, backgroundColor: 'lightgrey', paddingVertical: 4, paddingHorizontal: 6}}>
                <Text>More...</Text>
              </Pressable>
            </View>
          </View>
          
          {renderExpenditure()}
        </View>
        <View style={{borderTopWidth: 1, width: '80%'}}></View>
        <View style={{paddingVertical: 12, paddingHorizontal: 18, width: '100%'}}>
          <Text style={{fontSize: 24,}}>Planned income</Text>
            {/* <FlatList
              data={plannedTransactions}
              renderItem={renderPlannedIncome}
              keyExtractor={(item) => item.id}
            >

            </FlatList> */}
        </View>
      </View>

    </LinearGradient>
  )
}

export default ExpenditureScreen

const styles = StyleSheet.create({
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
  incomeCard: {
    width: "90%",
    // height: "80%",
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
})