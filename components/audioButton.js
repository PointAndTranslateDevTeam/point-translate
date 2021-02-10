import React, {useState} from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Speech from 'expo-speech';

const AudioButton = (props) => {

  const [speaking, setSpeaking] = useState(false);

  const playSound = async () => {
    { 
      if (await Speech.isSpeakingAsync()) {
        Speech.stop();
        setSpeaking(false);
      } else {
      Speech.speak(props.text, {
          language: props.lang
        })
        setSpeaking(true);
      }
      
    } 
  }

  return (
    <TouchableOpacity
      onPress={async () => playSound()}
      style={styles.audioContainer}
    >
      <Feather
        name={speaking ? "volume-x" : "volume-2"}
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
