import { Camera } from "expo-camera";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { connect } from "react-redux";
import { getText } from "../store/source";
import Settings from "../components/Settings";
import Error from "../components/Error";
import Confirmation from "../components/Confirmation";
import styles from "../styles/CameraStyle";
import EditText from './EditText'

//Choosing a functional component gives us access to useState hook
const CameraScreen = ({ getText, orgText, navigation, error, id }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [picture, setPicture] = useState(null);
  const [text, setText] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false)

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
          // console.log(orgText, error);
          // setText because if we do not, orgText is not updating when we take 2 photos of the same text -- ask during CODE REVIEW
          // setText(orgText);
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
            "Error",
            "Sorry, we could not find any text in your picture, try again!",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: true }
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
              },              {
                text: "Edit",
                onPress: () => navigation.navigate("EditText")
              },
              { text: "OK", onPress: () => navigation.navigate("Translation") },
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
  }, [id]);

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
          <View style={styles.topButtons}>
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
              style={styles.langButton}
              onPress={() => setShowModal(true)}
            >
              <Text style={styles.flipButtonText}>MODAL BUTTON HERE</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.shutterButton}
              onPress={() => takePicture()}
            ></TouchableOpacity>
          </View>
          <Settings showModal={showModal} setModal={setShowModal} />
        </View>

      </Camera>
    </View>
  );
};

const mapStateToProps = (state) => {
  // console.log('state', state)
  return {
    orgText: state.source.detectedText,
    error: state.source.error,
    id: state.source.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getText: (pic) => dispatch(getText(pic)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);
