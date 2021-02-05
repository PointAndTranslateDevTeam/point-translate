import {MaterialIcons} from '@expo/vector-icons';
import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

const FlipButton = () => {
    return (
        <TouchableOpacity
         style={styles.flipButton}
         onPress={() => {
            setType(
                type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
            }
        }>
            <MaterialIcons name="flip-camera-ios" size={30} color={"white"} styles={styles.FlipIcon}/>
        </TouchableOpacity>
);
}
const styles = StyleSheet.create({
    flipButton: {
      alignSelf: "flex-start",
    },
    flipIcon: {
        flex:1,
        color: "white"
    }
  });
export default FlipButton;