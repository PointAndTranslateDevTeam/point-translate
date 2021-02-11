import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { HelpfulText } from "../components";
import Tooltip from "react-native-walkthrough-tooltip"
import { connect } from "react-redux";
import {toggleTooltip} from "../store/toggleReducer"

function HomeScreen({ navigation, tooltip, toggleTooltip }) {
  const [showModal, setShowModal] = useState(false);
  const [screenTooltip, setScreenTooltip] = useState(false);

  console.log();
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
        <Tooltip
        isVisible={screenTooltip}
        content={
          <View>
            <Text>Welcome to Point and Translate! Find some text you'd like to translate, or an object you'd like to learn the vocabulary word for, and let's get started!</Text>
          </View>
        }
        onClose={()=> {
          toggleTooltip(true);
          console.log("the tooltip is closed but the toggle is still on", tooltip);
          setScreenTooltip(false);
        }}
        placement="top"
        topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Camera")}
            style={styles.tapForCameraButton}
          >
            <Text style={styles.tapForCameraText}>Tap To Start</Text>
          </TouchableOpacity></Tooltip>
        </View>
        <StatusBar style="auto" />
      </View>
      <View style={styles.helpButtonContainer}>
        
        <TouchableOpacity
          onPress={() => {
            setScreenTooltip(true);
            {tooltip ? toggleTooltip(false) : toggleTooltip(true)};
            console.log("tooltip mode engaged", tooltip);
            //setShowModal(true)
          }}
          style={{ margin: 10 }}
        >
          <MaterialIcons name="help" size={35} color="#032D38" />
        </TouchableOpacity> 
       
      </View>
      <HelpfulText showModal={showModal} setModal={setShowModal} />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    tooltip: state.toggle.tooltip
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTooltip: (bool) => dispatch(toggleTooltip(bool))
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
