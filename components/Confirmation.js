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
  ScrollView,
} from "react-native";
import EditText from "../screens/EditText";

const Confirmation = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  return (
    <Modal
      visible={props.showConfirmation}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.screenContainer}>
        <View style={styles.screen}>
          <View style={styles.settingContainer}>
            <View style={styles.confContainer}>
              <View>
                <Text style={{ fontWeight: "bold" }}>Text Detected:</Text>
              </View>
              <ScrollView>
                <Text>{props.orgText}</Text>
              </ScrollView>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  props.setShowConfirmation(false), props.setShowEdit(true);
                }}
              >
                <Text style={{ color: "white" }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  props.setShowConfirmation(false);
                  props.navigation.navigate("Translation");
                }}
              >
                <Text style={{ color: "white" }}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => props.setShowConfirmation(false)}
              >
                <Text style={{ color: "white" }}>Cancel</Text>
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
    orgText: state.source.detectedText,
    error: state.source.error,
  };
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    alignContent: 'center'
  },
  screen: {
    backgroundColor: "lightgray",
    alignItems: "center",
    marginTop: 50,
    borderRadius: 10,
    height: "75%",
    width: "85%",
    alignContent: "center",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'center'
  },

  confContainer: {
    width: "80%",
    height: "80%",
    alignItems: "center",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    width: 75,
    borderRadius: 4,
    backgroundColor: "#14274e",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    margin: 10,
  },
});
export default connect(mapStateToProps)(Confirmation);
