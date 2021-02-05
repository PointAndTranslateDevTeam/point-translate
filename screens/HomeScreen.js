import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import TargetPicker from "../components/TargetPicker";
import styles from "../styles/HomeStyle";
import { MaterialIcons } from "@expo/vector-icons";
import HelpfulText from "../components/HelpfulText";

function HomeScreen({ navigation }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Point & Translate</Text>
        </View>
        <Image style={styles.image} source={require("../CamAnimation.gif")} />
        <View>
          <Text style={styles.headlineText}>
            Use your device's camera to capture text, then have it translated
            into your language of choice
          </Text>
          <Text>Please select your target language:</Text>
          <TargetPicker initialValue="es" style={styles.targetPicker} />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Camera")}
            style={styles.tapForCameraButton}
          >
            <Text style={styles.tapForCameraText}>Tap To Start</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
        <View style={styles.helpButtonContainer}>
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <MaterialIcons name="help" size={50} color="#14274E" />
          </TouchableOpacity>
        </View>
        <HelpfulText showModal={showModal} setModal={setShowModal} />
      </View>
    </View>
  );
}

export default HomeScreen;
