import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import getAudio from "../API/getAudio";

const AudioButton = (text) => {
  console.log("type", typeof text);
  return (
    <TouchableOpacity
      onPress={() => getAudio(JSON.stringify(text))}
      style={styles.audioContainer}
    >
      <MaterialIcons
        name="play-circle-filled"
        size={34}
        color="#FB7573"
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
    borderRadius: 20,
    width: 40,
    height: 40,
    borderColor: "#FC9E9C",
    borderWidth: 3,
  },
  audioContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AudioButton;
