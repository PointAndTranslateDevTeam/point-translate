import React from "react";
import { connect } from "react-redux";
import { toggleOCR, toggleLabels } from "../../store/toggleReducer";

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
            <Text style={styles.optionText}>Get labels? (beta)</Text>
            <View>
              <Switch
                trackColor={{ false: "#006575", true: "#006575" }}
                thumbColor={props.labels ? "white" : "#f4f3f4"}
                onValueChange={props.toggleLabels}
                value={props.labels}
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
    labels: state.toggle.labels,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleOCR: () => dispatch(toggleOCR()),
    toggleLabels: () => dispatch(toggleLabels()),
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
    height: "45%",
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
    fontSize: 16,
  },
});
