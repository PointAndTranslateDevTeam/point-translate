import React from "react";
import { connect } from "react-redux";
import { toggleOCR } from "../../store/toggleReducer";

import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from "react-native";

const Settings = (props) => {
  return (
    <Modal transparent={true} visible={props.showModal} animationType="slide">
      <View style={styles.screenContainer}>
        <View style={styles.screen}>
          <View style={styles.settingContainer}>
            <Text style={styles.optionText}>
              Optimize for handwriting recognition?
            </Text>
            <View>
              <Switch
                trackColor={{ false: "#006575", true: "#006575" }}
                thumbColor={props.handwriting ? "white" : "#f4f3f4"}
                onValueChange={props.toggleOCR}
                value={props.handwriting}
              />
            </View>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => props.setModal(false)}>
                <Text style={styles.confirmText}>Confirm</Text>
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

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  screen: {
    alignItems: "center",
    backgroundColor: "#94B2BA",
    margin: 50,
    padding: 10,
    borderRadius: 10,
    height: "30%",
    justifyContent: "center",
  },
  settingContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    alignItems: "center",
    alignContent: "center",
  },
  optionText: {
    color: "white",
    fontSize: 16,
    padding: 15,
    fontWeight: "500",
  },
  button: {
    width: 100,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    margin: 30,
    backgroundColor: "#fb7573",
  },
  confirmText: {
    fontWeight: "bold",
    color: "white",
  },
});
