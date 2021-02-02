import React, { useState } from "react";
import TargetPicker from "../components/TargetPicker";
import { connect } from "react-redux";

import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";

const Error = (props) => {
  return (
    <Modal visible={props.showError} animationType="slide">
      <View style={styles.screen}>
        <View style={styles.settingContainer}>
          <TouchableOpacity onPress={() => props.setError(false)}>
            <Text>Back to camera</Text>
          </TouchableOpacity>
          <View>
            <Text>Error:</Text>
            <Text>Sorry, we did not detect any text in your image.</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    orgText: state.source.detectedText,
    error: state.source.error,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  settingContainer: {},
});
export default connect(mapStateToProps)(Error);
