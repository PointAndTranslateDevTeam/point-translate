import { Camera } from "expo-camera";
import { API_KEY } from "../secrets.js";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

//Choosing a functional component gives us access to useState hook
const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  //the image should be accessible on state to any component which imports it
  const [picture, setPicture] = useState(null);

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
        // console.log(data.base64);
        setPicture(data.base64);
        // console.log("PICTURE", picture[1]);
      }
      // console.log(picture)
    } catch (err) {
      console.log(err);
    }
  };

  const loaded = useRef(false);
  useEffect(() => {
    if (loaded.current) {
      toText();
    } else {
      loaded.current = true;
    }
  }, [picture]);

  const toText = async () => {
    console.log("hey");
    try {
      let response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" + API_KEY,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requests: [
              {
                image: {
                  content: picture,
                },
                features: [
                  {
                    type: "DOCUMENT_TEXT_DETECTION",
                  },
                ],
              },
            ],
          }),
        }
      );
      // console.log(picture[1]);
      const responseJSON = await response.json();
      // console.log(await response.json())
      // console.log(responseJSON);
      // console.log(responseJSON.responses[0]);
      // console.log(responseJSON.responses[0].fullTextAnnotation.text);

      // need to specify that if responseJS.responses[0] is an empty object AND if fullTextAnnotation is undefined, then no text
      if (responseJSON.responses[0] === {} || !responseJSON.responses[0].fullTextAnnotation) {
        Alert.alert(
          "No Text",
          "Sorry, we did not detect any text in your image.",
          // do we need OK/cancel? If not, I can remove!
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ],
          { cancelable: false }
        );

      } else {
        Alert.alert(
          "Please confirm detected text:",
          responseJSON.responses[0].fullTextAnnotation.text,
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            // left console.log to show it is working but we can call a function to translate the text after press OK
            // also suggesting that we set the state of "responseJSON.responses[0].fullTextAnnotation.text" to be original text or anything after confirmation.. depends how we are using state/store/etc
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ],
          { cancelable: false }
        );
      }
      console.log("bye");
    } catch (err) {
      console.error(err);
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
          <TouchableOpacity style={styles.shutterButton} onPress={() => takePicture()}>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default CameraScreen;

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
    borderBottomColor: '#AE2321',
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
