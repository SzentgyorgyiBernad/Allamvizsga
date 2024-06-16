import { View, Text, Pressable,Button, TextInput, ScrollView, Modal } from 'react-native'
import React, { useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import COLORS from '../../constants/colors'
import MyInput from '../../components/Molecules/MyInput'
import { useAddNewTransactionScreenLogic } from './AddNewTransaction.logic'
import { Switch } from 'react-native-switch'
import DateTimePickerModal from "react-native-modal-datetime-picker";


const AddNewTransactionScreen = () => {
    const { 
        transactionTypes,
        loading,
        getTransactionTypes,
        selectedTransaction,
        setSelectedTransaction,
        selectedTransactionType,
        setSelectedTransactionType,
        repetablePeriod,
        setRepetablePeriod,
        isEnabled,
        setIsEnabled,
        setAmount,
        amount,
        setDescription,
        description,
        handleTransactionSubmit } = useAddNewTransactionScreenLogic()
    const [visible, setVisible] = React.useState(false)
    const [date, setDate] = React.useState(new Date())

    useEffect(() => {
        getTransactionTypes()
    }, [])
    
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const reset = () => {
        setSelectedTransaction(null)
        setSelectedTransactionType(null)
        setRepetablePeriod(null)
        setIsEnabled(false)
        setAmount(0)
        setDescription('')
        setDate(new Date())
    }

    const renderTypeButton = ({item}) => {
        
        return (
            <Pressable onPress={() => setSelectedTransactionType(item)}
            style={({ pressed }) => [
                {
                    backgroundColor: selectedTransactionType === item.id ? 'lightgrey' : (pressed ? 'grey' : 'white'),
                },
                styles.transactionTypeButton,
                ]}
            key={item.id}>
            <Text>{item.name}</Text>
        </Pressable>
        )
        
    }


    const renderTransactionType = () => {
        if(loading) {
            return <Text>Loading...</Text>
        }
        if(transactionTypes.length === 0) {
            return <Text>No transaction types found.</Text>
        }
        return (
               <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', gap: 8, paddingTop: 6}}>
                   {transactionTypes.map(item => (
                        <View key={item.id}>
                            {renderTypeButton({ item })}
                        </View>
                    ))} 
               </View>
            
        )
    }

  return (
    <LinearGradient colors={[COLORS.primary, COLORS.black]} style={{flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
        <View 
            style={styles.topCard}>
            <Text style={{ textAlign: 'center', fontSize: 16}}>Add New Transaction Screen</Text>
        </View>
        <ScrollView style={{top: 100}} contentContainerStyle={{height: 950}}>   
        <View style={styles.centerCard}>
            <View style={{flexDirection: 'row', gap: 40, justifyContent: 'center', paddingVertical: 16}}>
                <Pressable 
                    style={({ pressed }) => [
                        {
                            backgroundColor: selectedTransaction === 'Income' ? 'lightgrey' : (pressed ? 'grey' : 'white'),
                        },
                        styles.transactionPressable,
                        ]}
                    onPress={() => {setSelectedTransaction('Income')}}
                    >
                    <Text style={{fontSize: 16, textAlign: 'center', fontWeight: 500}}>Income</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                    {
                        backgroundColor: selectedTransaction === 'Expenditure' ? 'lightgrey' : (pressed ? 'grey' : 'white'),
                    },
                    styles.transactionPressable,
                    ]}
                    onPress={() => {setSelectedTransaction('Expenditure')}}>
                    <Text style={{fontSize: 16, textAlign: 'center', fontWeight: 500}}>Expenditure</Text>
                </Pressable>
            </View>
            <View style={{paddingHorizontal: 16, width: "90%"}}>
                <MyInput value={String(amount)} placeholder='Amount' keyboardType='numeric' onChangeText={(value) => setAmount(value)}/>
            </View>
            <View style={{borderBottomWidth: 1, width: "80%" }}></View>
            <View style={{ width: "90%", gap: 5}}>
                <Text style={styles.title}>
                    Select income/expenditure type
                </Text>
                {renderTransactionType()}
            </View>
            <View style={{borderBottomWidth: 1, width: "80%" }}></View>
            <View style={{ width: "90%"}}>
                    <Text style={styles.title}>Description</Text>
                    <TextInput
                     value={description}
                     multiline={true}
                     placeholder='Description...'
                     style={styles.descriptionTextInput} 
                     onChangeText={(value) => setDescription(value)}/>
            </View>
            <View style={{borderBottomWidth: 1, width: "80%" }}></View>
            <View style={{ width: "90%", gap: 5}}>
                <Text style={styles.title}>Repetable</Text>
                <View style={{paddingLeft: 16}}>
                    <Switch
                        value={isEnabled}
                        activeText='On'
                        onValueChange={toggleSwitch}
                    ></Switch>
                </View>
                
                {isEnabled && 
                    <View style={{flexDirection: 'row', gap: 12}}>
                        <Pressable onPress={() => setRepetablePeriod('Daily')}
                            style={({ pressed }) => [
                                {
                                    backgroundColor: repetablePeriod === 'Daily' ? 'lightgrey' : (pressed ? 'grey' : 'white'),
                                },
                                styles.repetablePressable,
                                ]}
                        ><Text>Daily</Text></Pressable>
                        <Pressable onPress={() => setRepetablePeriod('Monthly')}
                             style={({ pressed }) => [
                                {
                                    backgroundColor: repetablePeriod === 'Monthly' ? 'lightgrey' : (pressed ? 'grey' : 'white'),
                                },
                                styles.repetablePressable,
                                ]}
                        ><Text>Monthly</Text></Pressable>
                        <Pressable onPress={() => setRepetablePeriod('Weekly') }
                             style={({ pressed }) => [
                                {
                                    backgroundColor: repetablePeriod === 'Weekly' ? 'lightgrey' : (pressed ? 'grey' : 'white'),
                                },
                                styles.repetablePressable,
                                ]}
                        ><Text>Weekly</Text></Pressable>
                        <Pressable onPress={() => setRepetablePeriod('Annual') }
                             style={({ pressed }) => [
                                {
                                    backgroundColor: repetablePeriod === 'Annual' ? 'lightgrey' : (pressed ? 'grey' : 'white'),
                                },
                                styles.repetablePressable,
                                ]}
                        ><Text>Annual</Text></Pressable>
                    </View>
                }
            </View>
            <View style={{ width: "90%", gap: 5}}>
                <Text style={styles.title}>Date</Text>
                 <Pressable style={styles.dateButton} onPress={() => setVisible(true)}>
                    {/* {console.log('Date:', date)} */}
                    <Text style={{textAlign: 'center'}}>{date.toISOString().split('T')[0]}</Text>
                </Pressable>   
                <DateTimePickerModal 
                    isVisible={visible}
                    mode="date"
                    onConfirm={(date) => {setDate(date); setVisible(false)}}
                    onCancel={() => setVisible(false)}
                />
                
            </View>
            <View style={{ alignItems: 'center'}}>
                <Pressable onPress={() => { handleTransactionSubmit(date); reset();}} style={styles.submitPressable}>
                    <Text style={{textAlign: 'center', fontSize: 22, fontWeight: 600}}>Submit</Text>
                </Pressable>
            </View>
        </View>
        </ScrollView>
        
    </LinearGradient>
  )
}

export default AddNewTransactionScreen

const styles = {
    topCard: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 20,
        width: '90%',
        position: 'absolute', 
        top: 40,
        
        
    },
    centerCard: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 22,
        paddingVertical: 12,
        borderRadius: 20,
        gap: 20,
        marginBottom: 110,
    },
    transactionPressable: {
        width: 130,
        borderWidth: 1,
        borderRadius: 15,
        padding: 7,
        borderColor: COLORS.primary
    },
    transactionTypeButton: {
        borderWidth: 1,
        borderRadius: 15,
        alignSelf: 'flex-start',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderColor: COLORS.primary
    },
    title: {
        fontSize: 16,
    },
    descriptionTextInput: {
        borderWidth: 1,
        borderRadius: 15,
        padding: 7,
        borderColor: COLORS.primary
    },
    repetablePressable: {
        borderWidth: 1,
        borderRadius: 15,
        borderColor: COLORS.primary,
        paddingVertical: 4,
        paddingHorizontal: 8
    },
    dateButton: {
        borderWidth: 1,
        borderRadius: 15,
        borderColor: COLORS.primary,
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: 'white',
        width: 130
    },
    submitPressable: {
        borderWidth: 1,
        borderRadius: 15,
        borderColor: COLORS.primary,
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: 'lightgrey',
        width: '80%'
    }


}