import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Speech from 'expo-speech';

const AudioButton = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
          Speech.speak(props.text, {
            language: props.lang
          })
        } 
      }
      style={styles.audioContainer}
    >
      <Feather
        name="volume-2"
        size={34}
        color="#FC9E9C"
        style={styles.outerCircle}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outerCircle: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40
  },
  audioContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AudioButton;
