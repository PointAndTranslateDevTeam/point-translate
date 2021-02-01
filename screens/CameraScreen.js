import { Camera } from "expo-camera";
import { API_KEY } from "../secrets.js";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { getText } from "../store/source";

//Choosing a functional component gives us access to useState hook
const CameraScreen = ({ getText, orgText, error }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [picture, setPicture] = useState(null);
  const [text, setText] = useState(null)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    try {
      const option = { base64: true };
      if (camera) {
        const data = await camera.takePictureAsync(option);
        setPicture(data.base64);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const textLoaded = useRef(false);
  useEffect(() => {
    (async () => {
      if (textLoaded.current) {
        try {
          console.log("before", error, orgText);
          await getText(picture);
          console.log(orgText, error)
          // setText because if we do not, orgText is not updating when we take 2 photos of the same text -- ask during CODE REVIEW
          setText(orgText)
        } catch (err) {
          console.error(err);
        }
      } else {
        textLoaded.current = true;
      }
    })();
  }, [picture]);

  const confLoaded = useRef(false);
  useEffect(() => {
    if (confLoaded.current) {
      console.log("after", error, orgText);
      try {
        if (error !== null) {
          Alert.alert(
            "No Text",
            "Sorry, we did not detect any text in your image.",
            { text: "OK", onPress: () => console.log("OK Pressed") }
          );
        }
        if (orgText !== "") {
          Alert.alert(
            "Please confirm detected text:",
            orgText,
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "OK", onPress: () => translate() },
            ],
            { cancelable: false }
          );
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      confLoaded.current = true;
    }
  },
 [text]);
 // if we use orgText, orgText isn't updating when we take 2 pictures of same text.. BUT error is when we take 2 images of NO text -- ask during CODE REVIEW
  // [orgText, error]);

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
            target: "es",
            //"format": "text"
          }),
        }
      );
      const jsonResponse = await response.json();
      console.log(
        "translated response",
        jsonResponse.data.translations[0].translatedText
      );
    } catch (err) {
      console.log(err);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera ref={(ref) => setCamera(ref)} style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.flipButton}
            // onPress={() => translate()}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={styles.flipButtonText}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shutterButton}
            onPress={() => takePicture()}
          ></TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    orgText: state.source.detectedText,
    error: state.source.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getText: (pic) => dispatch(getText(pic)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: 10,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  flipButton: {
    flex: 0.1,
    alignSelf: "flex-start",
  },
  shutterButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    padding: 40,
    alignSelf: "center",
    backgroundColor: "#D90E18",
    borderColor: "#B00000",
    borderBottomColor: "#AE2321",
    borderRadius: 50,
    borderWidth: 8,
    width: 80,
    height: 80,
    justifyContent: "center",
    margin: 20,
  },
  flipButtonText: {
    fontSize: 18,
    color: "white",
  },
});
