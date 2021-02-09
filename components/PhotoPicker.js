import React, { useState, useEffect, useRef } from "react";
import { Platform, StyleSheet, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";

// import Constants from "expo-constants";

const PhotoPicker = (props) => {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      console.log("RESULT OF PICKIMAGE CALL>>>>>", result);

      if (!result.cancelled) {
        console.log("PROPS>>>>>>>>", props);
        props.setPicture(result.base64);
        props.setImage(result.uri);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      <Text style={styles.selectText}>Upload Photo</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  selectText: {
    textAlign: "center",
    padding: 5,
    borderRadius: 10,
    marginTop: 1,
    marginBottom: 3,
    color: "white",
    fontSize: 15,
  },
});

export default PhotoPicker;
