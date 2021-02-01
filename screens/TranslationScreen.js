import React, {useState, useRef} from 'react';
import {API_KEY} from '../secrets.js';
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import {connect} from "react-redux"

const TranslationScreen = ({orgText, target}) => {
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

      translate()

    return (
        <View>
          {console.log('entering translation screen:', translation)}
            <Text>Original Text: {orgText}</Text>
            <Text>Translation: {translation}</Text>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        orgText: state.source.detectedText,
        target: state.target,
    }
}


export default connect(mapStateToProps, null)(TranslationScreen)
