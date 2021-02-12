import React from "react";
import { connect } from "react-redux";

import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";

const Error = (props) => {
  return (
    <Modal visible={props.showError} animationType="slide" transparent={true}>
      <View style={styles.screenContainer}>
        <View style={styles.screen}>
          <View style={styles.errorContainer}>
            <View>
              {props.labels ? (
                <Text style={styles.errorText}>
                  Sorry, we did not detect any objects in your image.
                </Text>
              ) : (
                <Text style={styles.errorText}>
                  Sorry, we did not detect any text in your image.
                </Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => props.setShowError(false)}
            >
              <Text style={styles.backText}>Back to camera</Text>
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
    labels: state.toggle.labels,
  };
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
    padding: 40,
    paddingTop: 35,
    borderRadius: 10,
    height: "25%",
    justifyContent: "center",
  },
  errorContainer: {
    alignItems: "center",
    flex: 1,
  },
  errorText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
  button: {
    width: 145,
    height: 37,
    borderRadius: 4,
    margin: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fb7573",
  },
  backText: {
    fontWeight: "bold",
    color: "white",
  },
});
export default connect(mapStateToProps)(Error);
