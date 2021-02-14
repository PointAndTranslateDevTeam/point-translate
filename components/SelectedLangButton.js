import React from "react";
// import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet, Text, View, StatusBar } from "react-native";
import Languages from "../languages";
import Tooltip from "react-native-walkthrough-tooltip";

const SelectedLangButton = ({ setShowOtherModal, target, setScreenTooltip, setCameraTooltip, screenTooltip }) => {
  return (
    <TouchableOpacity
      style={styles.languageButton}
      onPress={() => setShowOtherModal(true)}
    >
      <Tooltip
        isVisible={screenTooltip}
        content={
          <View>
            <Text style={styles.walkthrough}>Select a target language. Don't worry about your source language. If you take a picture of text, our app will detect what language it's in!</Text>
          </View>
        }
        onClose={() => {
          setScreenTooltip(false);
          setCameraTooltip(true);
        }}
        placement="bottom"
        topAdjustment={Platform.OS === "android" ? -StatusBar.currentHeight : 0}
      >
        {target ? (
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.selectText}>
              {/* <Text style={styles.selectText}>Select Language</Text> */}
              <Ionicons
                name="globe-outline"
                size={30}
                color={"white"}
                style={styles.selectText}
              />
            </Text>
            <Text style={styles.selectText}>{Languages[target]}</Text>
          </View>
        ) : (
          <Text style={styles.selectText}>Select Language</Text>
        )}
      </Tooltip>
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
    flex: 0.5,
    alignSelf: "flex-start",
    fontSize: 15,
    height: 40,
    width: 150,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  walkthrough: {fontSize: 16}
});

export default SelectedLangButton;
