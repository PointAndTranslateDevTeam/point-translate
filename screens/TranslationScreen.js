import React, { useState, useRef } from "react";
import { API_KEY } from "../secrets.js";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import styles from "../styles/TranslationStyle";
import AudioButton from "../components/audioButton";
import Languages from "../languages";

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
      <View style={styles.originalContainer}>
        <View>
          <Text style={styles.header}>Original Text:</Text>
        </View>
        <ScrollView>
          <Text style={styles.text}>{orgText}</Text>
        </ScrollView>
      </View>
      <View style={styles.translateContainer}>
        <View>
          <Text style={styles.header}>{Languages[target]} Translation:</Text>
        </View>
        <ScrollView>
          <Text style={styles.text}>{translation}</Text>
        </ScrollView>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text}>Listen:</Text>
          <AudioButton text={translation} />
        </View>
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
            backgroundColor: "#FB7573",
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

export default connect(mapStateToProps, null)(TranslationScreen);
