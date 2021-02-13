import React, { useState } from "react";
import { CLOUD_BASE_FUNCTION, PURPLE_SOCKS_KEY } from "@env";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { connect } from "react-redux";
import { AudioButton, TranslateHeader, LanguageModal } from "../components";
import Languages from "../languages";
import Tooltip from "react-native-walkthrough-tooltip";

const TranslationScreen = ({
  orgText,
  orgLabels,
  labels,
  target,
  navigation,
}) => {
  const [source, setSource] = useState(null);
  const [translation, setTranslation] = useState(null);
  const [showOtherModal, setShowOtherModal] = useState(false);
  const [screenTooltip, setScreenTooltip] = useState(false);
  const [languageTooltip, setLanguageTooltip] = useState(false);
  const [backTooltip, setBackTooltip] = useState(false);

  let textToTranslate = labels ? orgLabels.join(", ") : orgText;
  const translate = async () => {
    try {
      let response = await fetch(
        CLOUD_BASE_FUNCTION +
          "getTranslate?PURPLE_SOCKS_KEY=" +
          PURPLE_SOCKS_KEY,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            q: `${textToTranslate}`,
            target: `${target}`,
          }),
        }
      );
      const jsonResponse = await response.json();
      setSource(jsonResponse.data.translations[0].detectedSourceLanguage);
      setTranslation(jsonResponse.data.translations[0].translatedText);
    } catch (err) {
      console.error(err);
    }
  };

  translate();

  return (
    <View style={styles.screen}>
      <TranslateHeader
        title="Point & Translate"
        navigation={navigation}
        setScreenTooltip={setScreenTooltip}
        setBackTooltip={setBackTooltip}
        backTooltip={backTooltip}
      />
      <View>
        <View style={styles.contentContainer}>
          <View style={styles.orgText}>
            <Text style={styles.header}>Original Text:</Text>
          </View>
          <ScrollView>
            <Text style={styles.text}>
              {labels ? orgLabels.join(", ") : orgText}
            </Text>
          </ScrollView>
          <View style={styles.audioButtonContainer}>
            <Text style={styles.langDetected}>
              Language detected: {Languages[source]}
            </Text>
            <AudioButton text={textToTranslate} lang={source} />
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.header}>{Languages[target]} Translation:</Text>
          </View>
          <ScrollView>
            <Text style={styles.text}>{translation}</Text>
          </ScrollView>

          <View style={styles.audioButtonContainer}>
            <Tooltip
              isVisible={screenTooltip}
              content={
                <View>
                  <Text style={styles.walkthrough}>
                  Tap here to listen to your translation. Tap again to stop.
                  </Text>
                </View>
              }
              onClose={() => {
                setScreenTooltip(false);
                setLanguageTooltip(true);
              }}
              placement="top"
              topAdjustment={
                Platform.OS === "android" ? -StatusBar.currentHeight : 0
              }
            >
              <AudioButton text={translation} lang={target} />
            </Tooltip>
          </View>
        </View>
        <TouchableOpacity
          style={styles.languageButton}
          onPress={() => setShowOtherModal(true)}
        >
          <Tooltip
            isVisible={languageTooltip}
            content={
              <View>
                <Text style={styles.walkthrough}>
                Translate into another language...
                </Text>
              </View>
            }
            onClose={() => {
              setLanguageTooltip(false);
              setBackTooltip(true);
            }}
            placement="top"
            topAdjustment={
              Platform.OS === "android" ? -StatusBar.currentHeight : 0
            }
          >
            <Text style={styles.selectText}> Select another language</Text>
          </Tooltip>
        </TouchableOpacity>
      </View>
      <LanguageModal showModal={showOtherModal} setModal={setShowOtherModal} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    orgText: state.source.detectedText,
    orgLabels: state.labels.detectedLabels,
    target: state.target,
    labels: state.toggle.labels,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#94B2BA",
  },
  orgText: {
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
  },
  langDetected: {
    flex: 1,
    alignSelf: "center",
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    color: "#fb7573",
  },
  languageButton: {
    width: 250,
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fb7573",
    alignContent: "center",
    padding: 5,
  },
  selectText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  contentContainer: {
    height: "40%",
    alignItems: "center",
    margin: 10,
    marginTop: 20,
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
    textAlign: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  audioButtonContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  walkthrough: {
    fontSize: 16
  }
});

export default connect(mapStateToProps, null)(TranslationScreen);
