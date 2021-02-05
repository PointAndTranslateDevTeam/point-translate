import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { connect } from "react-redux";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const SettingsButton = (props) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <TouchableOpacity
      style={styles.settingsButton}
      onPress={() => setShowModal(true)}
    >
      <MaterialIcons
        name={props.handwriting ? "history_edu" : "text_format"}
        size={30}
        color={"white"}
        // styles={styles.FlipIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  settingsButton: {
    alignSelf: "flex-end",
    padding: 30,
  },
});

const mapStateToProps = (state) => {
  return {
    handwriting: state.toggle.handwriting,
  };
};

export default connect(mapStateToProps)(SettingsButton);
