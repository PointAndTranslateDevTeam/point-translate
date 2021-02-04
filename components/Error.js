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
    <Modal visible={props.showError} animationType="slide" transparent={true}>
      <View style={styles.screenContainer}>
        <View style={styles.screen}>
          <View style={styles.settingContainer}>
            <View>
              <Text>Error:</Text>
              <Text>Sorry, we did not detect any text in your image.</Text>
            </View>
            <TouchableOpacity onPress={() => props.setShowError(false)}>
              <Text>Back to camera</Text>
            </TouchableOpacity>
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
  screenContainer: {
    flex: 1,
    justifyContent: "center",
  },
  screen: {
    backgroundColor: "#fff",
    alignItems: "center",
    backgroundColor: "lightgray",
    margin: 50,
    padding: 40,
    borderRadius: 10,
    height: "50%",
    alignContent: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  settingContainer: {},
});
export default connect(mapStateToProps)(Error);
