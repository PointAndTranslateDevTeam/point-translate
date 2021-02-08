import React, { useState } from "react";
import { API_KEY } from "../secrets.js";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import AudioButton from "../components/audioButton";
import Languages from "../languages";
import TranslateHeader from '../components/headers/TranslateHeader'
import LanguageModal from "../components/modals/LanguageModal";
import { Ionicons } from "@expo/vector-icons";

import TranslateHeader from '../components/headers/TranslateHeader'
import LanguageModal from "../components/modals/LanguageModal";
import { Ionicons } from "@expo/vector-icons";
const TranslationScreen = ({ orgText, orgLabels, labels, target, navigation }) => {
  const [translation, setTranslation] = useState(null);
  const [showOtherModal, setShowOtherModal] = useState(false);

  

  const translate = async () => {
    console.log("heytranslate");
    console.log("text", orgLabels, "org", orgLabels.join(", "));
    let textToTranslate = labels ? orgLabels.join(", ") : orgText;
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
            q: `${textToTranslate}`,
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
      <TranslateHeader title="Point & Translate" navigation={navigation} />
      {console.log("entering translation screen:", translation)}

      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.header}>Original Text:</Text>
        </View>
        <ScrollView>
          <Text style={styles.text}>{labels ? orgLabels.join(", ") : orgText}</Text>
        </ScrollView>
      </View>
      <View style={styles.translateContainer}>
        <View>
          <Text style={styles.header}>{Languages[target]} Translation:</Text>
        </View>
        <ScrollView>
          <Text style={styles.text}>{translation}</Text>
        </ScrollView>
        <View style={styles.audioButtonContainer}>
          {/* <Text style={[styles.text, styles.audioText]}>Listen: </Text> */}
          <AudioButton text={translation} />
        </View>
      </View>
      <TouchableOpacity
        style={styles.languageButton}
        onPress={() => setShowOtherModal(true)}
      >
        <Text style={styles.selectText}> Select another language</Text>
      </TouchableOpacity>
      <LanguageModal showModal={showOtherModal} setModal={setShowOtherModal} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    orgText: state.source.detectedText,
    orgLabels: state.labels.detectedLabels,
    target: state.target,
    labels: state.toggle.labels
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#94B2BA",
  },
  languageButton: {
    width: 230,
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fb7573",
    alignContent: "center",
  },
  selectText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
  contentContainer: {
    width: "90%",
    height: "35%",
    alignItems: "center",
    margin: 10,
    marginTop: 30,
    padding: 20,
    paddingTop: 5,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    backgroundColor: "#006575",
  },
  translateContainer: {
    width: "90%",
    height: "40%",
    alignItems: "center",
    margin: 10,
    padding: 20,
    paddingTop: 5,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    backgroundColor: "#006575",
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 8,
    color: "white",
  },
  text: {
    color: "white",
  },
  audioButtonContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",

  },
  // audioText: {
  //   alignSelf: "center",
  // }
});

export default connect(mapStateToProps, null)(TranslationScreen);
