import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import Languages from "../languages";

const SelectedLangButton = ({ setShowOtherModal, target }) => {
  return (
    <TouchableOpacity
      style={styles.languageButton}
      onPress={() => setShowOtherModal(true)}
    >
      {target ? (
        <Text>
          <MaterialIcons
            style={styles.selectText}
            name="language"
            size={30}
            color={"white"}
          />
          <Text>{Languages[target]}</Text>
        </Text>
      ) : (
        <Text style={styles.selectText}>Select Language</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  selectText: {
    textAlign: "center",
    padding: 5,
    borderRadius: 10,
    marginTop: 1,
    marginBottom: 3,
    color: "white",
    fontSize: 18,
  },
  languageButton: {
    flexDirection: "row",
    flex: 0.45,
    alignSelf: "flex-start",
    fontSize: 15,
    height: 40,
    width: 150,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SelectedLangButton;
