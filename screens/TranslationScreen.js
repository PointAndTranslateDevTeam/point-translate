import React, {useState, useRef} from 'react';
import {API_KEY} from '../secrets.js';
import {
    View, 
    Text,
    StyleSheet
} from "react-native";
import {connect} from "react-redux"
import { useEffect } from 'react';

const TranslationScreen = ({route, orgText}) => {
    const [translation, setTranslation] = useState(null);

    // useEffect(() => {
    //     (() => {
    //         translate(route.params.text);
    //     })
    // }, [orgText])

    const textLoaded = useRef(false);
    useEffect(() => {
      (async () => {
        if (textLoaded.current) {
          try {
            const { transl } = await translate(route.params.text);
            setTranslation(transl);
          } catch (err) {
            console.error(err);
          }
        } else {
          textLoaded.current = true;
        }
      })();
    }, []);
  

    const translate = async () => {
        console.log("heytranslate");
        console.log("text", orgText);
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
                q: `${route.params.text}`,
                //"source": "en",
                target: "en",
                //"format": "text"
              }),
            }
          );
          const jsonResponse = await response.json();
          console.log(
            "translated response",
            jsonResponse.data.translations[0].translatedText
          );
          return jsonResponse.data.translations[0].translatedText;
        } catch (err) {
          console.log(err);
        }
      };

    if (translation === null) {
        return <Text>Uh Oh!</Text>
    }
    return (
        <View>
            {/* <Text>{translate(route.params.text)}</Text> */}
            <Text>{res}</Text>
        </View>
    )
}

const mapStateToProps = (state) => {
    console.log("state", state);
    return {
        orgText: state.source.detectedText, 
        error: state.source.error
    }
}


export default connect(mapStateToProps, null)(TranslationScreen)