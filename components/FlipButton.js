import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Camera } from "expo-camera";

const FlipButton = (props) => {
  return (
    <TouchableOpacity
      style={styles.flipButton}
      onPress={() => {
        props.setType(
          props.type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
        );
      }}
    >
      <MaterialIcons
        name="flip-camera-ios"
        size={30}
        color={"white"}
        styles={styles.FlipIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flipButton: {
    alignSelf: "flex-end",
    padding: 30,
  },
});

export default FlipButton;
