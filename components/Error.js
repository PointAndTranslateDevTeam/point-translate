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
              <Text>Sorry, we did not detect any text in your image.</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => props.setShowError(false)}>
              <Text style={{ fontWeight: "bold", color: 'white'}}>Back to camera</Text>
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
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  screen: {
    alignItems: "center",
    backgroundColor: "#94B2BA",
    margin: 50,
    padding: 40,
    borderRadius: 10,
    height: "35%",
    alignContent: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  settingContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "center",
    textAlign: "center",
    alignItems: "center",
    flex: 1,
  },
  button: {
    width: 125,
    borderRadius: 4,
    backgroundColor: "#fb7573",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    margin: 30,
  },
});
export default connect(mapStateToProps)(Error);
