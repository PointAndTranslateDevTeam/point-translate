import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import TargetPicker from "../components/TargetPicker";
import styles from "../styles/HomeStyle";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Point & Translate</Text>
        </View>
        <Image style={styles.image} source={require("../CamAnimation.gif")} />
        <View>
          <Text>Please select your target language:</Text>
            <TargetPicker initialValue="es" style={styles.targetPicker} />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Camera")}
            style={styles.tapForCameraButton}
          >
            <Text style={styles.tapForCameraText}>Tap For Camera</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

export default HomeScreen;
