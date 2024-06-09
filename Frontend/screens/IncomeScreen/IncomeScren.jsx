import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import COLORS from '../../constants/colors'
import { useIncomeScreenLogic } from './IncomeScreen.logic'

const IncomeScren = () => {
  const {
    transactions,
    budget,
    plannedTransactions,
    loading,
    error,
    onLogout,
    getTransactions,
    getMyPlannedTransactions  } = useIncomeScreenLogic();

  useEffect(() => {
    getTransactions()
    getMyPlannedTransactions()
r
  }, []);

  const renderIncome = () => {

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
        <Text style={{fontSize: 22}}>Statistics</Text>
        <Text style={{fontSize: 12}}>Where have you been earning money recently?</Text>
      </View>
      {/* Kiadasok */}
      <View>
        {renderIncome()}
      </View>

    </LinearGradient>
  )
}

export default IncomeScren

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
  },
})