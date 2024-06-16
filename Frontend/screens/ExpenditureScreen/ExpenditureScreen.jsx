import { View, Text, StyleSheet, Pressable, FlatList, Modal, TextInput } from 'react-native'
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
    budget,
    onLogout,
    getExpenditures,
    getMyPlannedExpenditures,
    getCompareToLastMonth,
    budgetAmount,
    setBudgetAmount,
    setBudget
    } = useExpenditureScreenLogic();

    useEffect(() => {
      getExpenditures()
      getMyPlannedExpenditures()
      getCompareToLastMonth()
    }, [selectedAccount]);

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
          <Text style={{ color: COLORS.red}}>{item.amount} {selectedAccount.currency.name.split(" ")[1]}</Text>
        </View>
        <View style={{ paddingLeft: 12, flexDirection: 'row', justifyContent: 'space-between'  }}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 10, width: 150 }}>Note: {item.note}</Text>
          <Text style={{fontSize: 10}}>{item.date.split("T")[0].split("-").join(". ")}</Text>
        </View>
      </View>
      ));
    }

    const renderPlannedExpenditure = ({item}) => {
      // console.log("item", item);
      return(
        <View style={{ paddingBottom: 6 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ height: 6, width: 6, backgroundColor: COLORS.red, borderRadius: 15, marginRight: 8 }}></View>
            <Text>{item.income_type.name || 'Unknown'}</Text>
          </View>
          <Text style={{ color: COLORS.red}}>{item.amount} {selectedAccount.currency.name.split(" ")[1]}</Text>
        </View>
        <View style={{ paddingLeft: 12, flexDirection: 'row', justifyContent: 'space-between'  }}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 10, width: 150 }}>Days remaining: {item.daysRemaining}</Text>
          <Text style={{fontSize: 10}}>{item.date.split("T")[0].split("-").join(". ")}</Text>
        </View>
      </View>
      )
    }

    const [budgetModalVisible, setBudgetModalVisible] = React.useState(false);

    const renderBudget = () => {
      if(budget.length === 0) {
        // console.log("budget", budget);
        return (
          <View style={{paddingHorizontal: 12, paddingVertical: 10}}>
            <Text>No budget set yet!</Text>
            <View style={{width: 100}}>
              <Pressable style={styles.buttonStyle} onPress={() => setBudgetModalVisible(true)}> 
                <Text>Set budget</Text>
              </Pressable>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={budgetModalVisible}
              onRequestClose={() => {
                setBudgetModalVisible(!budgetModalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Pressable onPress={() => setBudgetModalVisible(false)} style={{position: 'absolute', top: 5, right: 5, padding: 12}}>
                  <Text>Close</Text>
                </Pressable>
                  <Text style={{fontSize: 24}}>Set in new budget</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Amount"
                    keyboardType="numeric"
                    value={budgetAmount.toString()}
                    onChangeText={(value) => setBudgetAmount(value)}
                  />
                  <Pressable style={styles.buttonStyle} onPress={() => {setBudget(); setBudgetModalVisible(false); setBudgetAmount(0)}}>
                    <Text style={{fontSize: 18}}>Set budget</Text>
                  </Pressable>
                </View>
              </View>

            </Modal>
          </View>
        )
      } else{
        console.log("Van budget")
        // return (
        //   <View>
        //     <Text>Budget: {budget.amount} {selectedAccount.currency.name.split(" ")[1]}</Text>
        //     <Pressable style={styles.buttonStyle}>
        //       <Text>Change budget</Text>
        //     </Pressable>
        //   </View>
        // )
      }
    }

    const renderThreePlannedExpenditure = () => {
      if(plannedExpenditures.length === 0) {
        return <Text>No planned expenditures found yet!</Text>
      }
      const firstThreePlannedExpenditures = plannedExpenditures.slice(0, 3);
      return (
        <FlatList
          data={firstThreePlannedExpenditures.slice(0, 3)}
          renderItem={renderPlannedExpenditure}
          keyExtractor={(item) => item.id.toString()}
        />
      )
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

        <View style={{width: '100%', paddingHorizontal: 16, height: 100}}>
          <Text style={{fontSize: 24}}>Budget</Text>
          {renderBudget()}
        </View>

        <View style={{borderTopWidth: 1, width: '80%'}}></View>
        <View style={{paddingVertical: 12, paddingHorizontal: 18,width: '100%', height: 190}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 22}}>Expenditures</Text>
            <View style={{justifyContent: 'center', alignItems: 'flex-end', left: 60}}>
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
        <View style={{paddingVertical: 12, paddingHorizontal: 18, width: '100%', height: 190}}>
          <View style={{flexDirection: 'row', width: 260}}>
            <Text style={{fontSize: 22}}>Planned expenditure</Text>
            <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
                <Pressable 
                  onPress
                  style={{borderRadius: 15, backgroundColor: 'lightgrey', paddingVertical: 4, paddingHorizontal: 6}}>
                  <Text>More...</Text>
                </Pressable>
              </View>
          </View>
          
            {renderThreePlannedExpenditure()}
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
  buttonStyle: {
    backgroundColor: 'lightgrey',
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 8
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
    width: "90%", 
    height: 300, 
  },
  input: {
    height: 40,
    borderRadius: 15,
    marginVertical: 6,
    borderWidth: 1,
    padding: 10,
    width: '100%',
  },
  dateButton: {
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: 'lightgrey',
    width: '50%',
    marginVertical: 6,
  },
  modalViewGoals: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%", 
    height: 500, 
  },
  buttonStyleGoal: {
    backgroundColor: 'lightgrey',
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 8
  },
  centeredViewAdd: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalViewAdd: {
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
    width: "70%", 
    height: 230, 
  },
})