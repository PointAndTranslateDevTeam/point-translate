import React, { useState } from "react";
import TargetPicker from "../components/TargetPicker";
import styles from '../styles/SettingsStyle'

import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";

const Settings = (props) => {
  return (
    <Modal transparent={true} visible={props.showModal} animationType="slide">
      <View style={styles.screenContainer}>
        <View style={styles.screen}>
          <View style={styles.settingContainer}>
            <Text>Please select a language:</Text>
            <TouchableOpacity onPress={() => props.setModal(false)}>
              <Text>Back to camera</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Settings;
