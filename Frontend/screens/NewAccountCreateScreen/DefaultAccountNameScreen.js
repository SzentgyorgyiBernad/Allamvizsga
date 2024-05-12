import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text, StatusBar, Pressable } from "react-native";
import COLORS from "../../constants/colors";
import MyCard from "../../components/Molecules/MyCard";
import MyInput from "../../components/Molecules/MyInput";
import { useInvoiceCreateScreenLogic } from "../DefaultAccountCreateScreen/DefaultAccountCreate.Logic";

const DefaultAccountNameScreen = ({ navigation }) => {
  return (
    <LinearGradient>
      <MyCard>
        <View>
          <Text style={styles.text}>Enter your account name</Text>
        </View>
        <View>
          <MyInput
            style={styles.input}
            placeholder="Enter your account name..."
          ></MyInput>
        </View>
        <View>
          <Pressable>
            <Text style={styles.button}>Next</Text>
          </Pressable>
        </View>
      </MyCard>
      <StatusBar style="light" backgroundColor={COLORS.primary} />
    </LinearGradient>
  );
};

export default DefaultAccountNameScreen;
