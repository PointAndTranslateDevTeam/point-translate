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
            <Text style={styles.optionText}>Handwriting Mode: </Text>
            <Text style={styles.text}>
              Optimize for handwriting and dense text like books.
            </Text>
            <View>
              <Switch
                trackColor={{ false: "#006575", true: "#006575" }}
                thumbColor={props.handwriting ? "white" : "#f4f3f4"}
                onValueChange={props.toggleOCR}
                value={props.handwriting}
                disabled={props.labels}
              />
            </View>
            <Text style={styles.optionText}>Object Detection:</Text>
            <Text style={styles.text}>
              Take a picture of an object instead of text to learn vocabulary in
              a new language.
            </Text>
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
    height: "62%",
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
    fontSize: 18,
    padding: 15,
    paddingBottom: 1,
    fontWeight: "700",
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
  text: {

    fontWeight: "500",
    color: "white",
    fontSize: 16,
    padding: 15,
    paddingTop: 3,
  },
});
