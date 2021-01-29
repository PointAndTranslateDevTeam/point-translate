import { Camera } from "expo-camera";

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

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
    const option = { base64: true };
    if (camera) {
      const data = await camera.takePictureAsync(option);
      // console.log(data.base64);
      setPicture(data.base64);
      console.log("PICTURE", picture[1]);
      toTest();
    }
    // console.log(picture)
  };

  const toTest = async () => {
    console.log("hey");
    try {
      let response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
        process.env.API_KEY,
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
                    type: "TEXT_DETECTION",
                  },
                ],
              },
            ],
          }),
        }
      );
      console.log(picture[1]);
      const responseJSON = await response.json();
      // console.log(await response.json())
      // console.log(responseJSON)
      // console.log(responseJSON.fullTextAnnotation.text)

      console.log(responseJSON.responses[0].fullTextAnnotation.text);
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
          <TouchableOpacity style={styles.button} onPress={() => takePicture()}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
          {/* this can be deleted once you confirm you have access to the image in api */}
          {/* {image && <Image source = {{uri: image}} style={{ flex: 1 }} /> } */}
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
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
