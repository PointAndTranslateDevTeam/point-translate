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
    >
      <Feather
        name={speaking ? "volume-x" : "volume-2"}
        size={34}
        color="#FC9E9C"
      />
    </TouchableOpacity>
  );
};


export default AudioButton;
