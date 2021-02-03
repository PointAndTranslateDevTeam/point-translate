import React, { useState } from "react";
import TargetPicker from "../components/TargetPicker";
import { connect } from "react-redux";
import { toggleOCR } from "../store/toggleReducer";

import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Switch,
} from "react-native";

const Settings = (props) => {
  return (
    <Modal visible={props.showModal} animationType="slide">
      <View style={styles.screen}>
        <View style={styles.settingContainer}>
          <TouchableOpacity onPress={() => props.setModal(false)}>
            <Text>Back to camera</Text>
          </TouchableOpacity>
          <View style={styles.toggleContainer}>
            <Text>Optimize for handwriting recognition?</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={props.handwriting ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={props.toggleOCR}
              value={props.handwriting}
            />
          </View>
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
  settingContainer: {},
  toggleContainer: {
    padding: 70,
  },
});

const mapStateToProps = (state) => {
  return {
    handwriting: state.toggle.handwriting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleOCR: () => dispatch(toggleOCR()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
