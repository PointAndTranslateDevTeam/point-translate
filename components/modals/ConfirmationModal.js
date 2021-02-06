import React from "react";
import { connect } from "react-redux";

import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const Confirmation = (props) => {
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
              <Text style={styles.headerText}>Text Detected:</Text>
              <ScrollView style={styles.scrollView}>
                <Text style={styles.text}>{props.orgText}</Text>
              </ScrollView>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  props.setShowConfirmation(false), props.setShowEdit(true);
                }}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  props.setShowConfirmation(false);
                  props.navigation.navigate("Translation");
                }}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => props.setShowConfirmation(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
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
  };
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  screen: {
    backgroundColor: "#94B2BA",
    alignItems: "center",
    marginTop: 50,
    borderRadius: 10,
    height: "75%",
    width: "90%",
    justifyContent: "center",
  },
  settingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  confContainer: {
    width: "80%",
    height: "80%",
    alignItems: "center",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    justifyContent: "space-between",
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
    paddingBottom: 15,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    width: 75,
    borderRadius: 4,
    backgroundColor: "#fb7573",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  text: {
    color: "white",
    fontWeight: "500"
  }
});
export default connect(mapStateToProps)(Confirmation);