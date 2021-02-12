import React, { useEffect } from "react";
import { Platform, StyleSheet, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";

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
    // console.log("in upload");
    try {
      if (!props.target) {
        props.setShowNoLanguageError(true);
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5,
          base64: true,
        });

        if (!result.cancelled) {
          props.setLoading(true);
          await props.setPicture(result.base64);
          await props.setImage(result.uri);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TouchableOpacity style={styles.languageButton} onPress={pickImage}>
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
    fontSize: 18,
  },
});

export default PhotoPicker;
