import React from 'react';
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CameraScreen from './screens/CameraScreen'
import HomeScreen from './screens/HomeScreen'



const Stack = createStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
    </Stack.Navigator>
  </NavigationContainer>
    // <View style={{
    //   flex: 1
    // }}>
    //   <CameraScreen/>
    // </View>
  );
}

