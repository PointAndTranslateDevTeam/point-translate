import React, { useState, useEffect } from 'react';
import {  Text, View, Button } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Tap to open camera"
        onPress={() => navigation.navigate("Camera")}
      />
    </View>
  );
}

export default HomeScreen;
