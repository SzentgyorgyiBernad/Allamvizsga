import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/colors";
import Button from "../../components/Button";
import { useMenuScreenLogic } from "./MenuScreen.logic";

const { width } = Dimensions.get("window");

const Menu = ({ navigation }) => {
  const { accounts, getAccounts, onLogout } = useMenuScreenLogic();
  useEffect(() => {
    console.log("UseEffect hivodik");
    getAccounts();
  }, []);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const flatListRef = React.useRef();

  // const handleLogout = async () => {
  //   console.log("Logout");
  //   await AsyncStorage.removeItem("token");
  //   await AsyncStorage.removeItem("email");
  //   logout();
  //   console.log(AsyncStorage.getItem("token"));
  // };

  const handleScorll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setSelectedIndex(index);
    console.log("Index", index);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={{ borderWidth: 1, height: "100%", width: "100%" }}>
          <Text>{item.currency.name}</Text>
        </View>
      </View>
    );
  };

  // const renderAccounts = () => {};

  return (
    <LinearGradient
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
      colors={[COLORS.primary, COLORS.black]}
    >
      <View style={styles.titleCard}>
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
        >
          <View>
            <Text>Selected Index: {selectedIndex}</Text>
          </View>
        </FlatList>
      </View>
      <Button
        title="Logout"
        onPress={onLogout}
        style={{ width: "90%", marginTop: 16 }}
      />
    </LinearGradient>
  );
};

export default Menu;

const styles = StyleSheet.create({
  card: {
    width: width * 0.839,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 20,
  },
  titleCard: {
    position: "relative",
    top: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    height: 50,
    width: "90%",
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
});
