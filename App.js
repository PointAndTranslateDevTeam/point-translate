import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CameraScreen from "./screens/CameraScreen";
import HomeScreen from "./screens/HomeScreen";
import TranslationScreen from "./screens/TranslationScreen";
import EditText from "./screens/EditText";
import Confirmation from './components/Confirmation'
import Error from './components/Error';
import store from "./store";
import { Provider } from "react-redux";

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Camera" component={CameraScreen} />
      <MainStack.Screen name="Translation" component={TranslationScreen} />
    </MainStack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator mode="modal" headerMode="none">
          <RootStack.Screen name="Main" component={MainStackScreen} />
          <RootStack.Screen name="EditText" component={EditText} />
          <RootStack.Screen name="Error" component={Error} />
          <RootStack.Screen name="Confirmation" component={Confirmation} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
