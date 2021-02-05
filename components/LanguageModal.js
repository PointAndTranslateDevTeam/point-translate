import React from "react";
import TargetPicker from "../components/TargetPicker";
import styles from "../styles/HomeStyle";

import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Switch,
} from "react-native";

const LanguageModal = (props) => {
  return (
    <Modal transparent={true} visible={props.showModal} animationType="slide">
      <Text>Please select your target language:</Text>
          <TargetPicker initialValue="es" style={styles.targetPicker} />
    </Modal>
  )
}

export default LanguageModal;
