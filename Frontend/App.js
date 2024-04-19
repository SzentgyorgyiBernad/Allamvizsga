import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { RootNavigation } from "./Navigation/RootNavigation";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
}
