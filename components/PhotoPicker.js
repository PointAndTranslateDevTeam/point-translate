import React, { useEffect } from "react";
import { Platform, StyleSheet, TouchableOpacity, Text, StatusBar, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Tooltip from "react-native-walkthrough-tooltip";

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
      <Tooltip
        isVisible={props.uploadTooltip}
        content={
          <View>
            <Text style={styles.walkthrough}>...or upload a photo from your camera roll! (Don't forget to choose between text detection and object detection).</Text>
          </View>
        }
        onClose={() => {
          props.setUploadTooltip(false);
          props.setSettingsTooltip(true);
        }}
        placement="bottom"
        topAdjustment={Platform.OS === "android" ? -StatusBar.currentHeight : 0}
      >
        <Text style={styles.selectText}>Upload Photo</Text>
      </Tooltip>
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
  languageButton: {
    flexDirection: "row",
    flex: 0.45,
    alignSelf: "flex-start",
    fontSize: 15,
    height: 40,
    width: 500,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  walkthrough: {
    fontSize: 16
  }
});

export default PhotoPicker;
