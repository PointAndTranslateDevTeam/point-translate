import React from "react";
import TargetPicker from "../TargetPicker";

import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

const LanguageModal = (props) => {
  return (
    <Modal transparent={true} visible={props.showModal} animationType="slide">
      <View style={styles.screenContainer}>
        <View style={styles.screen}>
          <View style={styles.selectionContainer}>
            <Text style={styles.promptText}>
              Please select your target language:
            </Text>
            <TargetPicker />
            <View style={{ padding: 15 }}>
              <TouchableOpacity
                onPress={() => props.setModal(false)}
                style={styles.button}
              >
                <Text style={styles.confirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

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
    padding: 15,
    borderRadius: 10,
    height: "60%",
    alignContent: "center",
    flexDirection: "column",
    justifyContent: "center",
    opacity: 1,
  },
  selectionContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignContent: "center",
    textAlign: "center",
    alignItems: "center",
    flex: 1,
  },
  promptText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    padding: 15,
    paddingBottom: 1,
  },
  button: {
    width: 130,
    borderRadius: 4,
    backgroundColor: "#14274e",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    backgroundColor: "#FB7573",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    textAlign: "center",
  }
});
export default LanguageModal;
