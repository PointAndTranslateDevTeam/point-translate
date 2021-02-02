import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import TargetPicker from "../components/TargetPicker";
import styles from '../styles/HomeStyle'

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View
        style={styles.contentContainer}
      >
        <Text
          style={styles.titleText}
        >
          Point & Translate
        </Text>
        <View>
          <Text>Please select your target language:</Text>
          <TargetPicker initialValue="es" style={styles.targetPicker} />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Camera")}
          style={styles.tapForCameraButton}
        >
          <Text
            style={styles.tapForCameraText}
          >
            Tap For Camera
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

export default HomeScreen;
