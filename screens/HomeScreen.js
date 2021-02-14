// import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Tooltip from "react-native-walkthrough-tooltip";

function HomeScreen({ navigation }) {
  const [screenTooltip, setScreenTooltip] = useState(false);

  return (
    <View style={styles.screen}>
      <View style={styles.contentContainer}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Point & Translate</Text>
          <Text style={styles.headlineText}>
            Capture an image & translate it to another language
          </Text>
        </View>
        <Image
          style={styles.image}
          source={require("../assets/CamAnimation.gif")}
        />
        <View></View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Camera")}
            style={styles.tapForCameraButton}
          >
            <Tooltip
              isVisible={screenTooltip}
              content={
                <View>
                  <Text style={styles.walkthrough}>
                    Welcome to Point and Translate! Find some text you'd like to
                    translate, or an object you'd like to learn the vocabulary
                    word for, and let's get started! Look for the question mark ( ? )  icon on the next screen for more help.
                  </Text>
                </View>
              }
              onClose={() => {
                setScreenTooltip(false);
              }}
              placement="top"
              topAdjustment={
                Platform.OS === "android" ? -StatusBar.currentHeight : 0
              }
            >
              <Text style={styles.tapForCameraText}>Tap To Start</Text>
            </Tooltip>
          </TouchableOpacity>
        </View>
        {/* <StatusBar style="auto" /> */}
      </View>
      <View style={styles.helpButtonContainer}>
        <TouchableOpacity
          onPress={() => {
            setScreenTooltip(true);
          }}
          style={{ margin: 10 }}
        >
          <MaterialIcons name="help" size={35} color="#032D38" />
        </TouchableOpacity>
      </View>
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
    paddingTop: 15,
  },
  headlineText: {
    color: "#032D38",
    textAlign: "center",
    fontSize: 16,
    paddingHorizontal: 30,
    paddingBottom: 15,
  },
  buttonContainer: {
    paddingTop: 25,
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
  walkthrough: {
    fontSize: 16
  }
});

export default HomeScreen

