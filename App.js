import React from 'react';
import { View } from 'react-native';
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

