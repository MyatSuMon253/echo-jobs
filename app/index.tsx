import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import AuthScreen from "./screens/AuthScreen";
import DeckScreen from "./screens/DeckScreen";
import MapScreen from "./screens/MapScreen";
import ReviewScreen from "./screens/ReviewScreen";
import SettingScreen from "./screens/SettingScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

export default function Index() {
  const MainNavigator = createBottomTabNavigator();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MainNavigator.Navigator initialRouteName="welcome">
        <MainNavigator.Screen name="welcome" component={WelcomeScreen} />
        <MainNavigator.Screen name="auth" component={AuthScreen} />

        <MainNavigator.Screen name="map" component={MapScreen} />
        <MainNavigator.Screen name="deck" component={DeckScreen} />

        <MainNavigator.Screen name="review" component={ReviewScreen} />
        <MainNavigator.Screen name="setting" component={SettingScreen} />
      </MainNavigator.Navigator>
    </View>
  );
}
