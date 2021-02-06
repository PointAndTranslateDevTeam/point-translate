import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "../styles/HomeStyle";
import { MaterialIcons } from "@expo/vector-icons";
import HelpfulText from "../components/modals/InfoModal";

function HomeScreen({ navigation }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Point & Translate</Text>
          <Text style={styles.headlineText}>
            Capture an image of text & translate it to another language
          </Text>
        </View>
        <Image style={styles.image} source={require("../CamAnimation.gif")} />
        <View></View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Camera")}
            style={styles.tapForCameraButton}
          >
            <Text style={styles.tapForCameraText}>Tap To Start</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
      <View style={styles.helpButtonContainer}>
        <TouchableOpacity onPress={() => setShowModal(true)} style={{margin: 10}}>
          <MaterialIcons name="help" size={35} color="#032D38" />
        </TouchableOpacity>
      </View>
      <HelpfulText showModal={showModal} setModal={setShowModal} />
    </View>
  );
}

export default HomeScreen;
