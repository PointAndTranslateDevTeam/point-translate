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
          <View style={styles.settingContainer}>
            <View style={styles.toggleContainer}>
              <Text>
                Welcome to your fabulous placeholder for helpful instructions on
                how to use our magnificent application!
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={() => props.setModal(false)}>
              <Text>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default HelpfulText;
