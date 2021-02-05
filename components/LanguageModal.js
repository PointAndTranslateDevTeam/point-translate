import React from "react";
import TargetPicker from "../components/TargetPicker";
import styles from "../styles/HomeStyle";

import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from "react-native";

const LanguageModal = (props) => {
  return (
    <Modal transparent={true} visible={props.showModal} animationType="slide">
      <View style={langModStyles.screenContainer}>
        <View style={langModStyles.screen}>
          <View style={langModStyles.settingContainer}>
            <Text>Please select your target language:</Text>
            <TargetPicker style={styles.targetPicker} />
            <View>
              <TouchableOpacity onPress={() => props.setModal(false)}>
                <Text>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const langModStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
  },
  screen: {
    backgroundColor: "#fff",
    alignItems: "center",
    backgroundColor: "lightgray",
    margin: 50,
    padding: 15,
    borderRadius: 10,
    height: "60%",
    alignContent: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  settingContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignContent: "center",
    textAlign: "center",
    alignItems: "center",
    flex: 1,
  },
  // container: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "flex-start",
  // },
  // pickerContainer: {
  //   height: 200,
  //   width: "100%",
  //   backgroundColor: "#2286A2",
  // },
});
export default LanguageModal;
