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
          <TouchableOpacity
            style={styles.shutterButton}
            onPress={() => takePicture()}
          >
            {/* <Text style={styles.shutterButtonText}>point</Text> */}
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
    flexDirection: "column",
    justifyContent: "space-between",
    margin: 10,
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
  shutterButtonText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
 },
  flipButtonText: {
    fontSize: 18,
    color: 'white',
  }
});
