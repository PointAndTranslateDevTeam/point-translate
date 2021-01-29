import { Camera } from "expo-camera";

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

//Choosing a functional component gives us access to useState hook
const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  //the image should be accessible on state to any component which imports it
  const [image, setImage] = useState(null);

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
      console.log(data);
      setImage(data.uri);
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
            style={styles.shutterButton}
            onPress={() => takePicture()}
          >
            <Text style={styles.shutterButtonText}>Take Picture</Text>
          </TouchableOpacity>
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
  flipButton: {
    flex: 0.1,
    alignSelf: "flex-start",
    alignItems: "center",
  },
  shutterButton: {
    flex: 0.3,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignSelf: "center",
    backgroundColor: "#009688",
    borderRadius: 50,
  },
  shutterButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
    alignSelf: "center",
  },
});
