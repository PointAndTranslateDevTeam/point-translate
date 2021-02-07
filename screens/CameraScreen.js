import { Camera } from "expo-camera";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { connect } from "react-redux";
import { getText } from "../store/source";
import Settings from "../components/modals/SettingsModal";
import LanguageModal from "../components/modals/LanguageModal";
import Error from "../components/modals/ErrorModal";
import Confirmation from "../components/modals/ConfirmationModal";
import styles from "../styles/CameraStyle";
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
    <View style={styles.container}>
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
                  size={30}g
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
              {/* <Text style={styles.selectText}>Settings</Text> */}
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
    getLabels: (pic) => dispatch(getLabels(pic))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);
