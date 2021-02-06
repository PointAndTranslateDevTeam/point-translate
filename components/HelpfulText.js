import React, { useState } from "react";
import styles from "../styles/SettingsStyle";

import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Switch,
} from "react-native";

const HelpfulText = (props) => {
  return (
    <Modal transparent={true} visible={props.showModal} animationType="slide">
      <View style={styles.screenContainer}>
        <View style={styles.screen}>
          <View style={[styles.settingContainer, hStyles.helpfulBox]}>
            <View>
              <Text style={hStyles.settingsText}>
                Congratulations on downloading the best photo translation app in town!
               
                First, find the printed or handwritten text you would like to translate. 
                {"\n"}
                Click "tap to start" for the camera. 
                Select your desired language at the top right.
                {"\n"}
                Take a picture to request a translation. Edit text if necessary.
                {"\n"}
                Click confirm and view your text in its origin and your chosen language!
                {"\n"}
                Click back to camera to try another translation.
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity style={hStyles.backButton} onPress={() => props.setModal(false)}>
              <Text style={hStyles.backText}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const hStyles = StyleSheet.create({
  helpfulBox: {
    padding: 5
  },
  settingsText: {
    padding: 5,
    color: '#405C64'
  },
  backButton: {
    backgroundColor: "#405C64",
    padding: 5,
    borderRadius: 10
  },
  backText: {
    color: "white"
  }
})

export default HelpfulText;
