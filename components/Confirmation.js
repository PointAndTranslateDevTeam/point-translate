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
import EditText from "../screens/EditText";

const Confirmation = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  return (
    <Modal visible={props.showConfirmation} animationType="slide">
      <View style={styles.screen}>
        <View style={styles.settingContainer}>
          <TouchableOpacity onPress={() => props.setShowConfirmation(false)}>
            <Text>Back to camera</Text>
          </TouchableOpacity>
          <View>
            <Text>Confirmation:</Text>
            <Text>{props.orgText}</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              props.setShowConfirmation(false),

              props.setShowEdit(true)
            }}
          >
            <Text>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.setShowConfirmation(false);
              props.navigation.navigate("Translation");
            }}
          >
            <Text>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.setShowConfirmation(false)}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>

      </View>
      {/* <EditText
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          navigation={props.navigation}
        /> */}
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
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  settingContainer: {},
});
export default connect(mapStateToProps)(Confirmation);
