import { View, Text, StyleSheet, ScrollView, Pressable, Modal, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../../constants/colors'
import { useAllTransactionsScreenLogic } from './AllTransactionsScreen.logic';
import {Calendar} from 'react-native-calendars';

const AllTransactionsScreen = () => {
    const { 
        loading,
        error,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        period,
        setPeriod,
        getAllMyTransactionsWithDate,
        setCustomPeriod,   
        incomeNumber,
        onLogout,
        expenditureNumber,
        incomeAmount,
        expenditureAmount,
        incomeType,
        outcomeType,
    } = useAllTransactionsScreenLogic();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [buttonColor, setButtonColor] = React.useState("month");

    useEffect(() => {
        getAllMyTransactionsWithDate();
    }, [period])

    const renderAverages = () => {
        if (buttonColor === 'week') {
            return (
                <View>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between', paddingHorizontal: 12,  marginHorizontal: 12, borderRadius: 4, paddingHorizontal: 4}}>
                        <Text>Daily averages</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-around', width: 176, paddingHorizontal: 12}}>
                            <Text style={{color: COLORS.primary}}>{(incomeAmount / 7).toFixed(2)}</Text>
                            <Text style={{color: COLORS.red}}>{(-expenditureAmount / 7).toFixed(2)}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', gap: 160, paddingHorizontal: 12, backgroundColor: '#ebedeb', marginHorizontal: 12, borderRadius: 4, paddingHorizontal: 4}}>
                        <Text>Total</Text>
                        <View style={{flexDirection: 'row', gap: 45}}>
                            <Text style={{color: COLORS.primary}}>{incomeAmount}</Text>
                            <Text style={{color: COLORS.red}}>{-expenditureAmount}</Text>
                        </View>
                    </View>

                </View>
            )
        }
        else if (buttonColor === 'month') {
            return (
                <View>
                    <View style={{flexDirection: 'row', gap: 95, paddingHorizontal: 14, }}>
                        <Text>Daily averages</Text>
                        <View style={{flexDirection: 'row', gap: 50}}>
                            <Text style={{color: COLORS.primary}}>{(incomeAmount / 31).toFixed(2)}</Text>
                            <Text style={{color: COLORS.red}}>{(-expenditureAmount / 31).toFixed(2)}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', gap: 75, paddingHorizontal: 14, backgroundColor: '#ebedeb', marginHorizontal: 12, borderRadius: 4, paddingHorizontal: 4}}>
                        <Text>Weekly averages</Text>
                        <View style={{flexDirection: 'row', gap: 40}}>
                            <Text style={{color: COLORS.primary}}>{(incomeAmount / 4).toFixed(2)}</Text>
                            <Text style={{color: COLORS.red}}>{(-expenditureAmount / 4).toFixed(2)}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', gap: 160, paddingHorizontal: 14}}>
                        <Text>Total</Text>
                        <View style={{flexDirection: 'row', gap: 60}}>
                            <Text style={{color: COLORS.primary}}>{incomeAmount}</Text>
                            <Text style={{color: COLORS.red}}>{-expenditureAmount}</Text>
                        </View>
                    </View>
                    

                </View>
                
            )
    }
    else if (buttonColor === 'year') {
        return (
            <View>
                <View style={{flexDirection: 'row', gap: 97, paddingHorizontal: 14, }}>
                    <Text>Daily averages</Text>
                    <View style={{flexDirection: 'row', gap: 50}}>
                        <Text style={{color: COLORS.primary}}>{(incomeAmount / 366).toFixed(2)}</Text>
                        <Text style={{color: COLORS.red}}>{(-expenditureAmount / 366).toFixed(2)}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', gap: 78, paddingHorizontal: 14, backgroundColor: '#ebedeb', marginHorizontal: 12, borderRadius: 4, paddingHorizontal: 4}}>
                    <Text>Weekly averages</Text>
                    <View style={{flexDirection: 'row', gap: 55}}>
                        <Text style={{color: COLORS.primary}}>{(incomeAmount /52).toFixed(2)}</Text>
                        <Text style={{color: COLORS.red}}>{(-expenditureAmount / 52).toFixed(2)}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', gap: 67, paddingHorizontal: 14}}>
                    <Text>Monthly averages</Text>
                    <View style={{flexDirection: 'row', gap: 50}}>
                        <Text style={{color: COLORS.primary}}>{(incomeAmount / 12).toFixed(2)}</Text>
                        <Text style={{color: COLORS.red}}>{(-expenditureAmount / 12).toFixed(2)}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', gap: 160, paddingHorizontal: 14, backgroundColor: '#ebedeb', marginHorizontal: 12, borderRadius: 4, paddingHorizontal: 4}}>
                    <Text>Total</Text>
                    <View style={{flexDirection: 'row', gap: 60}}>
                        <Text style={{color: COLORS.primary}}>{incomeAmount}</Text>
                        <Text style={{color: COLORS.red}}>{-expenditureAmount}</Text>
                    </View>
                </View>
                

            </View>
            
        )
    }
}

    const renderIncomeTypeItem = ({item}) => {
        console.log("item", item);
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 22, marginHorizontal: 12, borderRadius: 4, paddingHorizontal: 4}}>
                <Text>{item.type}</Text>
                <View style={{flexDirection: 'row', gap: 50}}>
                    <Text style={{color: COLORS.primary}}>+{item.value}</Text>
                   </View>
            </View>
        )
    }

    const renderExpenditureTypeItem = ({item}) => {
        console.log("item", item);
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 22, marginHorizontal: 12, borderRadius: 4, paddingHorizontal: 4}}>
                <Text>{item.type}</Text>
                <View style={{flexDirection: 'row', gap: 50}}>
                    <Text style={{color: COLORS.red}}>{item.value}</Text>
                   </View>
            </View>
        )
    }

  return (
    <LinearGradient 
        colors={[COLORS.primary, COLORS.black]}
        style={styles.gradient}
        >
            <View style={styles.scrollViewContent}>
                <View style={styles.titleCard}>
                        <View style={{ width: 130, paddingLeft: 16 }}>
                        <Pressable onPress={() => onLogout()}>
                            <Text>Log out</Text>
                        </Pressable>
                        </View>
                        <Text style={{ fontSize: 22 }}>Overview</Text>
                </View>

                <View style={styles.periodCard}>
                    
                        <Pressable 
                            onPress={() => {setPeriod("week"); setButtonColor("week")}}
                            style={({ pressed }) => [
                                {
                                    backgroundColor: buttonColor === 'week' ? 'lightgrey' : (pressed ? 'grey' : 'white'),
                                },
                                styles.transactionPressable]}
                        >
                            <Text>Week</Text>
                        </Pressable>
                        <Pressable 
                            onPress={() => {setPeriod("month"); setButtonColor("month")}}
                            style={({ pressed }) => [
                                {
                                    backgroundColor: buttonColor === 'month' ? 'lightgrey' : (pressed ? 'grey' : 'white'),
                                },
                                styles.transactionPressable]}
                        >
                            <Text>Month</Text>
                        </Pressable>
                        <Pressable 
                            onPress={() => {setPeriod("year"); setButtonColor("year")}}
                            style={({ pressed }) => [
                                {
                                    backgroundColor: buttonColor === 'year' ? 'lightgrey' : (pressed ? 'grey' : 'white'),
                                },
                                styles.transactionPressable]}
                        >
                            <Text>Year</Text>
                        </Pressable>
                        <Pressable 
                            onPress={() => {setModalVisible(true); setButtonColor("custom")}}
                            style={({ pressed }) => [
                                {   
                                    backgroundColor: buttonColor === 'custom' ? 'lightgrey' : (pressed ? 'grey' : 'white'),
                                },
                                styles.customPeriodPressable]}
                        >
                            <Text>Custom</Text>
                        </Pressable>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Pressable onPress={() => setModalVisible(false)} style={{position: 'absolute', top: 5, right: 5, padding: 12}}>
                                        <Text>Close</Text>
                                    </Pressable>
                                    <Calendar
                                        // current={new Date()}
                                        minDate={'2000-01-01'}
                                        maxDate={'2100-12-31'}
                                        onDayPress={(day) => {
                                            if(day.dateString === startDate) {
                                                
                                                setStartDate(null);
                                                // setEndDate(null);
                                                return;
                                            }else if(day.dateString === endDate) {
                                                setEndDate(null);
                                                return;
                                            }else if (!startDate || new Date(day.dateString) < new Date(startDate)) {
                                                // Ha még nincs startDate, vagy a kiválasztott nap korábbi, mint a jelenlegi startDate
                                                setStartDate(day.dateString);  // Beállítjuk az új startDate-t
                                            } else {
                                                setEndDate(day.dateString);  // Különben beállítjuk az új endDate-t
                                            }
                                        }}
                                        monthFormat={'yyyy MM'}
                                        hideExtraDays={true}
                                        disableMonthChange={true}
                                        firstDay={1}
                                        markingType={'period'}
                                        markedDates={{
                                            [startDate]: {startingDay: true, color: 'green'},
                                            [endDate]: {endingDay: true, color: 'green'},
                                        }}
                                    />
                                    <View>
                                        <Pressable onPress={() =>  setCustomPeriod()}>
                                            <Text>OK</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    
                </View>
                <View style={styles.transactionTypesCard}>
                    <View style={{width: '100%', paddingHorizontal: 18, paddingVertical: 18}}>
                        <Text style={{ fontSize: 22 }}>
                            Reports
                        </Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <View style={{borderBottomWidth: 1, width: "80%" }}></View> 
                    </View>                       
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end',gap: 12, padding: 18, paddingHorizontal: 32}}>
                            <Text style={{fontSize: 14}}>Income</Text>
                            <Text style={{fontSize: 14}}>Expenditure</Text>
                        </View>
                        <View style={{  backgroundColor: '#ebedeb',flexDirection: 'row', marginHorizontal: 12, paddingHorizontal: 4, borderRadius: 4}}>
                            <Text>Number of transactions</Text>
                            <View style={{ flexDirection: 'row', width: 176, justifyContent: 'space-around', paddingHorizontal: 16}}>
                                <Text style={{marginRight: 28}}>{incomeNumber}</Text>
                                <Text>{expenditureNumber}</Text>
                            </View>
                        </View>
                        <View style={{ height: 100}}>
                            {renderAverages()}
                        </View>
                        <View>
                        <View style={{alignItems: 'center'}}>
                            <View style={{borderBottomWidth: 1, width: "80%" }}></View> 
                        </View> 
                        <View style={{width: '100%', paddingHorizontal: 18, paddingVertical: 18}}>
                            <Text style={{ fontSize: 22 }}>
                                Income & Expenditure BOOK
                            </Text>
                        </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 34}}>
                                <Text>Income</Text>
                            
                            </View>
                            <View style={{paddingHorizontal: 28}}>
                                <FlatList
                                    data={incomeType}
                                    // keyExtractor={(item) => item.type}
                                    renderItem={renderIncomeTypeItem}
                                >

                                </FlatList>
                            </View>
                            <View style={{alignItems: 'center'}}>
                                <View style={{borderBottomWidth: 1, width: "70%", paddingVertical: 8 }}></View> 
                            </View>                 
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 34}}>
                                <Text>Expenditure</Text>
                            
                            </View>
                            <View style={{paddingHorizontal: 28}}>
                                <FlatList
                                    data={outcomeType}
                                    // keyExtractor={(item) => item.type}
                                    renderItem={renderExpenditureTypeItem}
                                >

                                </FlatList>
                            </View>
                            
                        </View>

                </View>
    
                {/* <View style={styles.incomeCard}>
                    <View style={{width: '100%', paddingHorizontal: 18, paddingVertical: 18}}>
                    <Text style={{ fontSize: 22, paddingBottom: 8 }}>
                        All transactions
                    </Text>
                    </View>
                </View> */}
                
            </View>

    </LinearGradient>
  )
}

export default AllTransactionsScreen

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        paddingBottom: 20,
    },
    scrollView: {
        flex: 1,
        borderRadius: 20,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 22,
        gap: 8,
        // paddingTop: 36,
        // paddingBottom: 20,
        borderRadius: 20,

    },
    titleCard: {
        alignItems: "center",
        backgroundColor: COLORS.white,
        height: 50,
        width: "100%",
        borderRadius: 20,
        flexDirection: "row",
        marginTop: 36
    },
    periodCard: {
        flexDirection: 'row',
        // justifyContent: 'space-bet',
        gap: 8,
        width: "100%",
        height: 50,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 12,
    },
    incomeCard: {
        width: "100%",
        height: 330,
        backgroundColor: COLORS.white,
        borderRadius: 20,
    },
    expenseCard: {
        width: "100%",
        height: 330,
        backgroundColor: COLORS.white,
        borderRadius: 20,
    },
    transactionTypesCard: {
        width: "100%",
        height: 700,
        backgroundColor: COLORS.white,
        borderRadius: 20,
    },
    transactionPressable: {
        width: 65,
        borderWidth: 1,
        borderRadius: 15,
        // padding: 7,
        borderColor: COLORS.primary,
        alignItems: 'center',
    },
    customPeriodPressable: {
        width: 125,
        borderWidth: 1,
        borderRadius: 15,
        // padding: 7,
        borderColor: COLORS.primary,
        alignItems: 'center',
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
});
