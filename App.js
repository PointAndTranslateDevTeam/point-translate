import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CameraScreen from "./screens/CameraScreen";
import HomeScreen from "./screens/HomeScreen";
import TranslationScreen from "./screens/TranslationScreen";
import store from "./store";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";

const Stack = createStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    Staatliches: require("./assets/fonts/Staatliches-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Translation" component={TranslationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
