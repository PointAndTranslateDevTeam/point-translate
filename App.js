import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CameraScreen from './src/screens/CameraScreen'

export default function App() {
  return (
    <View style={{
      flex: 1
    }}>
      <CameraScreen/>
    </View>
  );
}

