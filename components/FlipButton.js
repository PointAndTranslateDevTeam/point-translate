import {MaterialIcons} from '@expo/vector-icons';
import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import { Camera } from "expo-camera";

const FlipButton = (props) => {
    //To modify the camera from the FlipButton component, we pass in hooks from CameraScreen as props
    return (
        <TouchableOpacity
         style={styles.flipButton}
         onPress={() => {
            props.setType(
                props.type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                )}}>
            <MaterialIcons name="flip-camera-ios" size={30} color={"white"} styles={styles.FlipIcon}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    flipButton: {
      alignSelf: "flex-end",
      padding: 30
    }
    // flipIcon: {
    //     padding: 10
    // }
  }
);

export default FlipButton;