import {Ionicons} from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

const FlashButton = (props) => {
    return (
        <TouchableOpacity 
         style={styles.flashButton} 
         onPress={() => {
             console.log("flash pressed")
             props.setFlash(
                 props.flash === Camera.Constants.FlashMode.torch
                 ? Camera.Constants.FlashMode.off
                 : Camera.Constants.FlashMode.torch
             )
             }}>
            <Ionicons name="flash-outline" size={30} color={"white"} style={styles.flashIcon}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    flashButton: {
      alignSelf: "flex-end",
      padding: 30,
    }
    // flashIcon: {
    //     padding: 10
    // }
  }
);

export default FlashButton;