import { useEffect, useState } from "react";
import { TabNavigation } from "./TabNavigation/TabNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
import { AuthStack } from "./StackNavigation/AuthStack";

export const RootNavigation = () => {
  const [loading, setLoading] = useState(false);
  // const [email, setEmail] = useState("");
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    const getToken = async () => {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");
      // console.log(token);
      setLoading(false);
      setToken(token);
      return token;
    };
    getToken();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  if (token === null) {
    console.log("here");
    return <AuthStack />;
  }

  return <TabNavigation />;
};
