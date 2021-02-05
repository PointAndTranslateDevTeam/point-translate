import React, { useState } from "react";
import { connect } from "react-redux";
import { toggleOCR } from "../store/toggleReducer";
import styles from "../styles/SettingsStyle";

import { View, Text, Modal, TouchableOpacity, Switch } from "react-native";

const Settings = (props) => {
  return (
    <Modal transparent={true} visible={props.showModal} animationType="slide">
      <View style={styles.screenContainer}>
        <View style={styles.screen}>
          <View style={styles.settingContainer}>
            <Text style= {{color: "white", fontSize: 16, padding:15, fontWeight: "500"}}>Optimize for handwriting recognition?</Text>
            <View style={styles.toggleContainer}>
              <Switch
                trackColor={{ false: "#006575", true: "#006575"}}
                thumbColor={props.handwriting ? "white" : "#f4f3f4"}
                onValueChange={props.toggleOCR}
                value={props.handwriting}
              />
            </View>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => props.setModal(false)}>
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

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
