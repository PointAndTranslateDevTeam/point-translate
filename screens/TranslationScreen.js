import React, { useState, useRef } from "react";
import { API_KEY } from "../secrets.js";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

const TranslationScreen = ({ orgText, target, navigation }) => {
  const [translation, setTranslation] = useState(null);

  const translate = async () => {
    console.log("heytranslate");
    // console.log("text", orgText);
    try {
      let response = await fetch(
        "https://translation.googleapis.com/language/translate/v2?key=" +
          API_KEY,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            q: `${orgText}`,
            //"source": "en",
            target: `${target}`,
            //"format": "text"
          }),
        }
      );
      const jsonResponse = await response.json();
      console.log(
        "translated response",
        jsonResponse.data.translations[0].translatedText
      );
      setTranslation(jsonResponse.data.translations[0].translatedText);
    } catch (err) {
      console.log(err);
    }
  };

  translate();

  return (
    <View style={styles.screen}>
      {console.log("entering translation screen:", translation)}
      <View style={styles.textContainer}>
        <View style={styles.header}>
          <Text style={{ fontSize: 35 }}>Original Text:</Text>
        </View>
        <Text>{orgText}</Text>
      </View>
      <View style={styles.textContainer}>
        <View style={styles.header}>
          <Text style={{ fontSize: 35 }}>Translation:</Text>
        </View>
        <Text>{translation}</Text>
      </View>
      <View style={styles.cameraBtn}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Camera")}
          style={{
            width: 130,
            borderRadius: 4,
            backgroundColor: "#14274e",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 40,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Back to Camera
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    orgText: state.source.detectedText,
    target: state.target,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  textContainer: {
    width: "80%",
    height: "35%",
    alignItems: "center",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    fontSize: 50,
  },
  cameraBtn: {
    marginTop: 50,
  }
});
export default connect(mapStateToProps, null)(TranslationScreen);
