import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { HelpfulText } from "../components";

function HomeScreen({ navigation }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <View style={styles.screen}>
      <View style={styles.contentContainer}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Point & Translate</Text>
          <Text style={styles.headlineText}>
            Capture an image of text & translate it to another language
          </Text>
        </View>
        <Image style={styles.image} source={require("../assets/CamAnimation.gif")} />
        <View></View>
        <View style={styles.buttonContainer}>
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
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={{ margin: 10 }}
        >
          <MaterialIcons name="help" size={35} color="#032D38" />
        </TouchableOpacity>
      </View>
      <HelpfulText showModal={showModal} setModal={setShowModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fb7573",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 8,
    backgroundColor: "#fb7573",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 20,
  },
  titleText: {
    color: "#032D38",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 53,
    fontFamily: "Staatliches",
    paddingTop: 15
  },
  headlineText: {
    color: "#032D38",
    textAlign: "center",
    fontSize: 16,
    paddingHorizontal: 30,
    paddingBottom: 15
  },
  buttonContainer: {
    paddingTop: 25
  },
  tapForCameraButton: {
    width: 130,
    borderRadius: 4,
    backgroundColor: "#032D38",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  tapForCameraText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Staatliches",
    fontSize: 20,
  },
  // title:{
  //   height: "25%"
  // },
  image: {
    width: 375,
    height: 275,
    resizeMode: "contain",
    marginVertical: 0,
  },
  helpButtonContainer: {
    flex: 1,
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    padding: 10,
  },
});

export default HomeScreen;
