import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { API_KEY } from "../secrets.js";
import { connect } from "react-redux";

class TranslationScreen extends React.Component {
  async translate() {
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
          body: {
            q:
              "The Great Pyramid of Giza (also known as the Pyramid of Khufu or the Pyramid of Cheops) is the oldest and largest of the three pyramids in the Giza pyramid complex.",
            source: "en",
            target: "es",
            format: "text",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    console.log("PROPS", this.props);
    return (
      <View>
        <Text>This is our source:{this.props.source}</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    source: state.source.detectedText,
    target: state.target,
  };
};

export default connect(mapStateToProps)(TranslationScreen);
