import { Camera } from "expo-camera";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { connect } from "react-redux";
import {
  Settings,
  LanguageModal,
  Error,
  Confirmation,
  EditText,
  LoadingWheel,
  FlipButton,
  FlashButton,
  Header,
  PhotoPicker,
  SelectedLangButton,
} from "../components";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Languages from "../languages";
import { getText, clearText } from "../store/sourceReducer";
import { getLabels, clearLabels } from "../store/labelsReducer";

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
  clearText,
  clearLabels,
}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [camera, setCamera] = useState(null);
  const [picture, setPicture] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showOtherModal, setShowOtherModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showNoLanguageError, setShowNoLanguageError] = useState(false);
  const [showLabelsError, setShowLabelsError] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const ocrType = handwriting ? "DOCUMENT_TEXT_DETECTION" : "TEXT_DETECTION";

  const takePicture = async () => {
    try {
      const option = { base64: true };
      if (camera) {
        if (!target) {
          setShowNoLanguageError(true);
        } else {
          const data = await camera.takePictureAsync(option);
          setPicture(data.base64);
          setImage(data.uri);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const textLoaded = useRef(false);
  useEffect(() => {
    (async () => {
      if (textLoaded.current) {
        try {
          if (!labels) {
            // console.log("in text");
            await clearLabels();
            await getText(picture, ocrType);
          }
          if (labels) {
            // console.log("in labels");
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
  }, [image]);

  const confLoaded = useRef(false);
  useEffect(() => {
    setLoading(false);
    if (confLoaded.current) {
      try {
        if (orgText !== "") {
          setShowConfirmation(true);
        }
        if (orgLabels.length > 0) {
          setShowConfirmation(true);
        } else if (error !== null || labelsError !== null) {
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
      <Header title="Point & Translate" navigation={navigation} />
      <Camera
        ref={(ref) => setCamera(ref)}
        style={styles.camera}
        type={type}
        flashMode={flash}
      >
        <View style={styles.buttonContainer}>
          <View style={styles.topButtons}>
            <SelectedLangButton
              setShowOtherModal={setShowOtherModal}
              target={target}
            />
            <PhotoPicker
              target={target}
              setPicture={setPicture}
              setImage={setImage}
              setLoading={setLoading}
              setShowNoLanguageError={setShowNoLanguageError}
            />
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
          <NoLanguageError
            showNoLanguageError={showNoLanguageError}
            setShowError={setShowNoLanguageError}
            navigation={navigation}
          />
          <Confirmation
            image={image}
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
    clearText: () => dispatch(clearText()),
    clearLabels: () => dispatch(clearLabels()),
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
    padding: 10,
    height: 500,
    flexDirection: "row",
    justifyContent: "space-around",
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
    fontSize: 18,
  },
  languageButton: {
    flexDirection: "row",
    flex: 0.45,
    alignSelf: "flex-start",
    fontSize: 15,
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
    backgroundColor: "#FC9E9C",
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
