import React from "react";

import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";

const HelpfulText = (props) => {
  return (
    <Modal transparent={true} visible={props.showModal} animationType="slide">
      <View style={styles.screenContainer}>
        <View style={styles.screen}>
          <View style={[styles.infoBox]}>
            <View>
              <Text style={styles.infoText}>
                Congratulations on downloading the best photo translation app in
                town! First, find the printed or handwritten text you would like
                to translate.
                {"\n"}
                Click "Tap to start" for the camera. Select your desired
                language at the top left.
                {"\n"}
                Take a picture to request a translation. Edit text if necessary.
                {"\n"}
                Click confirm and view your text in its origin and your chosen
                language!
                {"\n"}
                Click back to camera to try another translation.
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => props.setModal(false)}
            >
              <Text style={styles.okayText}>Okay</Text>
            </TouchableOpacity>
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
    margin: 35,
    padding: 15,
    borderRadius: 10,
    height: "60%",
    justifyContent: "center",
  },
  infoBox: {
    padding: 10,
    paddingBottom: 15,
    paddingTop: 5,
  },
  infoText: {
    color: "white",
    fontWeight: "500",
  },
  button: {
    width: 130,
    height: 40,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FB7573",
  },
  okayText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default HelpfulText;
