import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CameraScreen from "./screens/CameraScreen";
import HomeScreen from "./screens/HomeScreen";
import store from "./store";
import { Provider } from "react-redux";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    // <View style={{
    //   flex: 1
    // }}>
    //   <CameraScreen/>
    // </View>
  );
}
