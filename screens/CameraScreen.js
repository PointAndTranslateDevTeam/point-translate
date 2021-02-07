import { Camera } from "expo-camera";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { connect } from "react-redux";
import { getText, clearText } from "../store/source";
import Settings from "../components/modals/SettingsModal";
import LanguageModal from "../components/modals/LanguageModal";
import Error from "../components/modals/ErrorModal";
import Confirmation from "../components/modals/ConfirmationModal";
import EditText from "../components/modals/EditTextModal";
import LoadingWheel from "../components/LoadingWheel";
import FlipButton from "../components/FlipButton";
import FlashButton from "../components/FlashButton";
import { Ionicons } from "@expo/vector-icons";
import Languages from "../languages";
import { getLabels } from "../store/label";

//A few 
//So 1. coopt ocrType with a ternary-- if handwriting, then document_text_detection, but if not handwriting, then, if labels, then label_detection, and otherwise, text_detection
// { handwriting ? doccument_text_detection: {labels? label_detection : text_detection}}
//2. run the getLabels function only if no text is found in the photo-- i like this option
//3. just put another labels variable on state. least elegant option,
//and what is implemented below.

import Header from "../components/headers/Header";

//Choosing a functional component gives us access to useState hook
const CameraScreen = ({
  getText,
  orgText,
  getLabels,
  orgLabels,
  navigation,
  error,
  labelsError,
  id,
  labelsId,
  handwriting,
  labels,
  target,
  clearText
}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [camera, setCamera] = useState(null);
  const [picture, setPicture] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showOtherModal, setShowOtherModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showLabelsError, setShowLabelsError] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const ocrType = handwriting ? "DOCUMENT_TEXT_DETECTION" : "TEXT_DETECTION";
 // const ocrType = "LABEL_DETECTION";
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
          console.log("before", error, orgText, orgLabels);
          if (!labels) {
          await getText(picture, ocrType);  
          }
          if (labels) {
            await clearText();
            await getLabels(picture);
          }
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
    setLoading(false);
    if (confLoaded.current) {
      console.log("after", error, orgText, id, orgLabels);
      try {
        
        if (orgText !== "") {
          setShowConfirmation(true);
        } 
        if (orgLabels.length>0) {
          setShowConfirmation(true);
        } else if (error !== null || labelsError !== null) { 
          console.log("error", error);
          console.log("this is the error", showError); 
          setShowError(true);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      confLoaded.current = true;
    }
  }, [id, labelsId]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.screen}>
      <Header title="Point & Translate" navigation={navigation}/>
      <Camera
        ref={(ref) => setCamera(ref)}
        style={styles.camera}
        type={type}
        flashMode={flash}
      >
        <View style={styles.buttonContainer}>
          <View style={styles.topButtons}>
            <TouchableOpacity
              style={styles.languageButton}
              onPress={() => setShowOtherModal(true)}
            >
              <Text style={styles.selectText}>
                {/* <Text style={styles.selectText}>Select Language</Text> */}
                <Ionicons
                  name="globe-outline"
                  size={30}
                  color={"white"}
                  style={styles.selectText}
                />
              </Text>
              <Text style={styles.selectText}>{Languages[target]}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.langButton}
              onPress={() => setShowModal(true)}
            >
              <Ionicons
                name={handwriting ? "pencil-outline" : "text-outline"}
                size={30}
                color={"white"}
                style={styles.selectText}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.cameraControlContainer}>
            <FlipButton type={type} setType={setType} />
            <TouchableOpacity
              style={styles.shutterButton}
              onPress={() => {
                setLoading(true);
                takePicture();
              }}
            ></TouchableOpacity>
            <FlashButton flash={flash} setFlash={setFlash} />
          </View>
          <LanguageModal
            showModal={showOtherModal}
            setModal={setShowOtherModal}
          />
          <Settings showModal={showModal} setModal={setShowModal} />
          <EditText
            showEdit={showEdit}
            setShowEdit={setShowEdit}
            navigation={navigation}
          />
          <Error
            showError={showError}
            setShowError={setShowError}
            navigation={navigation}
          />
          <Confirmation
            showEdit={showEdit}
            setShowEdit={setShowEdit}
            showConfirmation={showConfirmation}
            setShowConfirmation={setShowConfirmation}
            navigation={navigation}
          />
          <LoadingWheel loading={loading} />
        </View>
      </Camera>
    </View>
  );
};

const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    orgText: state.source.detectedText,
    orgLabels: state.labels.detectedLabels,
    error: state.source.error,
    labelsError: state.labels.error,
    id: state.source.id,
    labelsId: state.labels.id,
    handwriting: state.toggle.handwriting,
    labels: state.toggle.labels,
    target: state.target,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getText: (pic, ocrType) => dispatch(getText(pic, ocrType)),
    getLabels: (pic) => dispatch(getLabels(pic)),
    clearText: (pic) => dispatch(clearText())
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  topButtons: {
    flex: 1,
    padding: 20,
    height: 500,
    flexDirection: "row",
    justifyContent: "space-between",
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
    alignSelf: "flex-start",
  },

  selectText: {
    textAlign: "center",
    padding: 5,
    borderRadius: 10,
    marginTop: 1,
    marginBottom: 3,
    color: "white",
    fontSize: 20,
  },
  languageButton: {
    flexDirection: "row",
    flex: 0.6,
    alignSelf: "flex-start",
    fontSize: 18,
    height: 40,
    width: 150,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  langButton: {
    alignSelf: "flex-start",
    fontSize: 18,
    backgroundColor: "rgba(0,0,0,0.5)",
    height: 35,
    borderRadius: 10,
    width: 50,
  },
  shutterButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    padding: 40,
    alignSelf: "center",
    // backgroundColor: "#D90E18",
    // backgroundColor: "#009FB8",
    backgroundColor: "#FC9E9C",
    // borderColor: "#006575",
    borderColor: "#FB7573",
    borderRadius: 50,
    borderWidth: 8,
    width: 80,
    height: 80,
    margin: 20,
  },
  flipButtonText: {
    fontSize: 18,
    color: "white",
  },
  cameraControlContainer: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);
