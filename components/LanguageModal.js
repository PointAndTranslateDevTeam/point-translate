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
            <Text style={{color: "#fff", fontSize: 18, fontWeight: "500", padding:15, paddingBottom:1}}>Please select your target language:</Text>
            <TargetPicker style={styles.targetPicker} />
            <View style={{padding:15}}>
              <TouchableOpacity onPress={() => props.setModal(false)}
              style={{
                width: 130,
                borderRadius: 4,
                backgroundColor: "#14274e",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                backgroundColor: "#FB7573",
              }}>
                <Text style={{
              color: "#fff",
              fontWeight: "700",
              fontSize: 15,
              textAlign: "center",
            }} >Confirm</Text>
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
    opacity: 1
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
