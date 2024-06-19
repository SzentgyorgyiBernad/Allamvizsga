import { View, Text, StyleSheet, Pressable, FlatList, Modal, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import COLORS from '../../constants/colors'
import { useIncomeScreenLogic } from './IncomeScreen.logic'
import { ArrowUpRight,ArrowDownRight  } from 'react-native-feather'
import DateTimePickerModal from "react-native-modal-datetime-picker";



const IncomeScren = () => {
  const [addModalVisible, setAddModalVisible] = React.useState(false);
  const [viewModalVisible, setViewModalVisible] = React.useState(false);
  const [dateVisible, setDateVisible] = React.useState(false);
  const [addAmount, setAddAmount] = React.useState(0);
  const [addVisible, setAddVisible] = React.useState(false);
  const [visibleAllIncome, setVisibleAllIncome] = React.useState(false);
  const [visibleAllPlannedIncome, setVisibleAllPlannedIncome] = React.useState(false);

  const {
    transactions,
    totalAmount,
    plannedTransactions,
    loading,
    error,
    setSelectedDate,
    compareToLastMonthPercentage,
    selectedAccount,
    onLogout,
    getTransactions,
    getMyPlannedTransactions,
    getCompareToLastMonth,

    goalname,
    setGoalName,
    goalAmount,
    setGoalAmount,
    endDate,
    setEndDate,
    description,
    setDescription,
    handleGoalCreate,
    goals,
    getMyGoals,
    addMoney
    } = useIncomeScreenLogic();

  useEffect(() => {

    getTransactions()
    getMyPlannedTransactions()
    getCompareToLastMonth()
    getMyGoals()
  }, [selectedAccount]);

  const renderPercentage = (data) => {
    if(data === "Infinity") {
        return(
          <View style={{flexDirection: 'row', gap: 8, width: "90%", height: 50, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'black', fontSize: 18}}>100%</Text>
          </View>
        )
      }
    if(data === "NaN") {
      return (
        <View style={{flexDirection: 'row', gap: 8, width: "90%", height: 50, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'black', fontSize: 18}}>0%</Text>
        </View>
      )
    }
    if(data >= 0) {
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


  const renderIncomeChart = () => {
    return (
      <View style={{ flexDirection: "row", gap: 8, width: "90%" }}>
        <View style={{borderWidth: 3, borderColor: COLORS.primary, width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 16, color: COLORS.primary }}>+{totalAmount}</Text>
          <Text style={{fontSize: 10, color: COLORS.primary }}>{selectedAccount.currency.name.split(" ")[1]}</Text>
        </View>
        <View>
          <Text> Compared to last month</Text>
          {renderPercentage(compareToLastMonthPercentage.percentage)}
        </View>
      </View>
    )
  }

  const renderIncome = () => {
    
    if(transactions.length === 0) {
      return <Text>No transactions found yet!</Text>
    }
    const firstThreeTransactions = transactions.slice(0, 3);
    return firstThreeTransactions.map((item, index) => (
      <View key={index} style={{ paddingBottom: 6 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ height: 6, width: 6, backgroundColor: COLORS.primary, borderRadius: 15, marginRight: 8 }}></View>
          <Text>{item.income_type.name}</Text>
        </View>
        <Text style={{ color: COLORS.primary}}>{item.amount} {selectedAccount.currency.name.split(" ")[1]}</Text>
      </View>
      <View style={{ paddingLeft: 12, flexDirection: 'row', justifyContent: 'space-between'  }}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 10, width: 150 }}>Note: {item.note}</Text>
        <Text style={{fontSize: 10}}>{item.date ? item.date.split("T")[0].split("-").join(". ") : item.newDate.split("T")[0].split("-").join(". ") }</Text>
      </View>
    </View>
    ));
  }

  const renderPlannedIncome = ({item}) => {
    return(
      <View key={item.id} style={{ paddingBottom: 6 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ height: 6, width: 6, backgroundColor: COLORS.primary, borderRadius: 15, marginRight: 8 }}></View>
          <Text>{item.income_type.name || 'Unknown'}</Text>
        </View>
        <Text style={{ color: COLORS.primary}}>{item.amount} {selectedAccount.currency.name.split(" ")[1]}</Text>
      </View>
      <View style={{ paddingLeft: 12, flexDirection: 'row', justifyContent: 'space-between'  }}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 10, width: 150 }}>Days remaining: {item.daysRemaining}</Text>
        <Text style={{fontSize: 10}}>{item.date.split("T")[0].split("-").join(". ")}</Text>
      </View>
    </View>
    )
  }

  const renderMyGoal = (data) => {
    if(data.length === 0) {
      return <Text>No goals found yet!</Text>
    }
    return(
      <View>
        {data.map((item, index) => (
          <View key={index} style={{paddingVertical: 12, paddingHorizontal: 12, width: '100%'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 18}}>{item.name}</Text>
              <View>
                <Text>{item.amount}/{item.endAmount} {selectedAccount.currency.name.split(" ")[1]}</Text>
              </View>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text>Note: {item.description} </Text>
              <Text>{((item.amount / item.endAmount) * 100).toFixed(2)}</Text>
            </View>
          </View>
        ))}
      </View>
    )
  }

  

  const renderAllMyGoal = (item) => {
    return(
      <View key={item.index} style={{paddingVertical: 12, paddingHorizontal: 12, width: '100%', paddingBottom: 18}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 18}}>{item.item.name}</Text>
          <View>
            <Text>{item.item.amount}/{item.item.endAmount} {selectedAccount.currency.name.split(" ")[1]}</Text>
          </View>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text style={{fontSize: 14}}>Note: {item.item.description} </Text>
          <Text>{((item.item.amount / item.item.endAmount) * 100).toFixed(2)} %</Text>
        </View>
        <View style={{justifyContent: 'flex-end'}}>
          <TextInput 
            value={addAmount.toString()}
            placeholder='Amount...'
            style={styles.input}
            keyboardType='numeric'
            onChangeText={(value) => setAddAmount(value)}/>
          <Pressable onPress={() => {addMoney(addAmount, item.item.id); setAddVisible(false);}} style={styles.buttonStyle} >
            <Text style={{fontSize: 18, textAlign: 'center'}}>Add</Text>
          </Pressable>

        </View>
      </View>
    )
  }
  
  const renderAllIncome = ({item}) => {
    return(
      <View key={item.id} style={{ paddingBottom: 6 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ height: 6, width: 6, backgroundColor: COLORS.primary, borderRadius: 15, marginRight: 8 }}></View>
          <Text>{item.income_type.name || 'Unknown'}</Text>
        </View>
        <Text style={{ color: COLORS.primary}}>{item.amount} {selectedAccount.currency.name.split(" ")[1]}</Text>
      </View>
      <View style={{ paddingLeft: 12, flexDirection: 'row', justifyContent: 'space-between'  }}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 10, width: 150 }}>Note: {item.note}</Text>
        <Text style={{fontSize: 10}}>{item.date.split("T")[0].split("-").join(". ")}</Text>
      </View>
    </View>
    )
  }

  const renderThreePlannedIncome = () => {
    if(plannedTransactions.length === 0 || !plannedTransactions) {
      return (<Text>No planned transactions found yet!</Text>)
    }

    return (
      <FlatList
        data={plannedTransactions}
        renderItem={renderPlannedIncome}
        keyExtractor={(item) => item.id}
      >
      </FlatList>
    )
  }



  return (
    <LinearGradient colors={[COLORS.primary, COLORS.black]} style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      paddingTop: 20,
    }}>
      <View style={styles.titleCard}>
        <View style={{ width: 130, paddingLeft: 16 }}>
          <Pressable onPress={() => onLogout()}>
            <Text>Log out</Text>
          </Pressable>
        </View>

        <Text style={{ fontSize: 22 }}>Income</Text>
      </View>
      <View style={styles.incomeCard}>
        <View>
          <Text style={{fontSize: 28}}>Statistics</Text>
          <Text style={{fontSize: 12}}>How much money did you get this month and where did you get it from?
          </Text>
        </View>
        <View style={{ paddingVertical: 8}}> 
          {renderIncomeChart()}
        </View>
        <View style={{borderTopWidth: 1, width: '80%'}}></View>
        <View style={{paddingVertical: 12, paddingHorizontal: 18,width: '100%', height: 190}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{fontSize: 28}}>Earnings</Text>
            <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
              <Pressable 
                onPress={() => {setVisibleAllIncome(true)}}
                style={styles.buttonStyle}>
                <Text>More...</Text>
              </Pressable>
            </View>
          </View>
          {renderIncome()}
          <Modal
            animationType="slide"
            transparent={true}
            visible={visibleAllIncome}
            onRequestClose={() => {
              setVisibleAllIncome(!visibleAllIncome);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <Pressable onPress={() => setVisibleAllIncome(false)} style={{position: 'absolute', top: 5, right: 5, padding: 12}}>
                <Text>Close</Text>
              </Pressable>
              <View style={{paddingBottom: 12}}>
                <Text style={{fontSize: 22}}>All transactions</Text>
              </View>
              <View style={{width: '80%', height: 400}}>
              <FlatList
                data={transactions}
                renderItem={renderAllIncome}
                keyExtractor={(item) => item.id}
              >
                </FlatList>
              </View>
              </View>
            </View>


          </Modal>
        </View>
        <View style={{borderTopWidth: 1, width: '80%'}}></View>
        <View style={{paddingVertical: 12, paddingHorizontal: 18, width: '100%', height: 195}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 24,}}>Planned income</Text>
            <View style={{justifyContent: 'center', alignItems: 'flex-end', }}>
              <Pressable 
                onPress={() => {setVisibleAllPlannedIncome(true)}}
                style={styles.buttonStyle}>
                <Text>More...</Text>
              </Pressable>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={visibleAllPlannedIncome}
              onRequestClose={() => {
                setVisibleAllPlannedIncome(!visibleAllPlannedIncome);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Pressable onPress={() => setVisibleAllPlannedIncome(false)} style={{position: 'absolute', top: 5, right: 5, padding: 12}}>
                  <Text>Close</Text>
                </Pressable>
                <View style={{paddingBottom: 12}}>
                  <Text style={{fontSize: 22}}>All planned transactions</Text>
                </View>
                <View style={{width: '80%', height: 400}}>
                {renderThreePlannedIncome()}
                </View>
                </View>
              </View>

            </Modal>
          </View>
            {renderThreePlannedIncome()}
        </View>
        <View style={{borderTopWidth: 1, width: '80%'}}></View>
        <View style={{ paddingVertical: 12, width: '100%', paddingHorizontal: 18}}>
          <Text style={{fontSize: 20}}>
          Goals that I would like to achieve
          </Text>
          {renderMyGoal(goals.slice(0, 1))}
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12}}>
            <Pressable onPress={() => {setAddModalVisible(true);}} style={styles.buttonStyle}>
              <Text>
                Add new goal
              </Text>
            </Pressable>
            <Pressable onPress={() => {setViewModalVisible(true);}} style={styles.buttonStyle}>
              <Text>
                View all
              </Text>
            </Pressable>
            <Modal
              animationType="slide"
              transparent={true}
              visible={addModalVisible}
              onRequestClose={() => {
                setAddModalVisible(!addModalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Pressable onPress={() => setAddModalVisible(false)} style={{position: 'absolute', top: 5, right: 5, padding: 12}}>
                  <Text>Close</Text>
                </Pressable>
                <View style={{paddingBottom: 12}}>
                  <Text style={{fontSize: 22}}>Create new goal</Text>
                </View>
                <View style={{width: '80%'}}>
                  <Text style={{fontSize: 18}}> Goal name</Text>
                  <TextInput
                     value={goalname}
                     placeholder='Goal name...'
                     style={styles.input} 
                     onChangeText={(value) => setGoalName(value)}/>

                  <Text style={{fontSize: 18}}> Amount</Text>
                  <TextInput
                     value={goalAmount}
                     placeholder='Goal amount...'
                     style={styles.input} 
                     keyboardType='numeric'
                     onChangeText={(value) => setGoalAmount(value)}/>
                  <Text style={{fontSize: 18}}> Description</Text>
                  <TextInput
                     value={goalname}
                     placeholder='Description...'
                     style={styles.input} 
                     onChangeText={(value) => setDescription(value)}/>
                  <Text style={{fontSize: 18}}> Date</Text>
                    <Pressable style={styles.dateButton} onPress={() => setDateVisible(true)}>
                    <Text style={{textAlign: 'center'}}>{endDate.toISOString().split('T')[0]}</Text>
                    </Pressable>   
                    <DateTimePickerModal 
                        isVisible={dateVisible}
                        mode="date"
                        onConfirm={(date) => {setEndDate(date); setDateVisible(false)}}
                        onCancel={() => setDateVisible(false)}
                    />
                </View>

                <View style={{justifyContent: 'center', width: '60%', paddingTop: 40}}>
                  
                  <Pressable style={styles.buttonStyle} onPress={() => {setAddModalVisible(false); handleGoalCreate()}}>
                    <Text style={{fontSize: 18, textAlign: 'center'}}>Create</Text>
                  </Pressable>
                </View>
                </View>
              </View>

            </Modal>
            <Modal
              animationType="slide"
              transparent={true}
              visible={viewModalVisible}
              onRequestClose={() => {
                setViewModalVisible(!viewModalVisible);
              }}
            >
              <View style={styles.centeredView}>
                
                <View style={styles.modalViewGoals}>
                <Pressable
                onPress={() => setViewModalVisible(false)} style={{position: 'absolute', top: 5, right: 5, padding: 12}}>
                  <Text>Close</Text>
                </Pressable>
                  <View style={{paddingBottom: 12}}>
                    <Text style={{fontSize: 22}}>All goals</Text>
                  </View>
                  <View style={{width: '80%', height: 400}}>
                  <FlatList
                    data={goals}
                    renderItem={renderAllMyGoal}
                    keyExtractor={(item) => item.id}
                  >

                  </FlatList>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          
        </View>
      </View>
    </LinearGradient>
  )
};

export default IncomeScren

const styles = StyleSheet.create({
  titleCard: {
    position: "relative",
    top: 0,
    alignItems: "center",
    backgroundColor: COLORS.white,
    height: 50,
    width: "90%",
    borderRadius: 20,
    flexDirection: "row",
  },
  incomeCard: {
    width: "90%",
    height: "90%",
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginVertical: 8,
    paddingHorizontal: 20,
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
    height: 500, 
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
