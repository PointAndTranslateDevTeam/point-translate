import React from "react";
import TargetPicker from "../components/TargetPicker";
import styles from "../styles/HomeStyle";

import { View, Text, Modal, TouchableOpacity, Switch, StyleSheet } from "react-native";

const LanguageModal = (props) => {
  return (
    <Modal transparent={true} visible={props.showModal} animationType="slide">
      <View style={langModStyles.container}>
        <View style={langModStyles.pickerContainer}>
          <Text>Please select your target language:</Text>
          <TargetPicker initialValue="es" style={styles.targetPicker} />
        </View>
      </View>
    </Modal>
  );
};

const langModStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#006575",
  },
  pickerContainer: {
    height: 200,
    width: "100%",
    backgroundColor: "#2286A2",
  },
});
export default LanguageModal;
