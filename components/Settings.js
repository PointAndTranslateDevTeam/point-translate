import React, { useState } from "react";
import TargetPicker from "../components/TargetPicker";

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
    <Modal visible={props.showModal} animationType="slide">
      <View style={styles.screen}>
        <View style={styles.settingContainer}>
          <TouchableOpacity onPress={() => props.setModal(false)}>
            <Text>Back to camera</Text>
          </TouchableOpacity>
          <View>
            <Text>Please select a language:</Text>
            {/* <TargetPicker initialValue="es" style={{ width: "50%" }} /> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  settingContainer: {

  },
});
export default Settings;
