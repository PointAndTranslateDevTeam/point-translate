import { Camera } from "expo-camera";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { connect } from "react-redux";
import {
  LanguageModal,
  Error,
  Confirmation,
  EditText,
  LoadingWheel,
  FlipButton,
  FlashButton,
  Header,
  PhotoPicker,
} from "../components";
import { getText, clearText } from "../store/sourceReducer";
import { getLabels } from "../store/labelsReducer";
import { MaterialIcons } from "@expo/vector-icons";
import Tooltip from "react-native-walkthrough-tooltip";

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
}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [camera, setCamera] = useState(null);
  const [picture, setPicture] = useState(null);
  // const [showModal, setShowModal] = useState(false);
  const [showOtherModal, setShowOtherModal] = useState(false);
  const [showError, setShowError] = useState(false);
  // const [showLabelsError, setShowLabelsError] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [screenTooltip, setScreenTooltip] = useState(false);
  const [settingsTooltip, setSettingsTooltip] = useState(false);
  const [cameraTooltip, setCameraTooltip] = useState(false);
  const [uploadTooltip, setUploadTooltip] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const ocrType = handwriting ? "DOCUMENT_TEXT_DETECTION" : "TEXT_DETECTION";

  const takePicture = async (uploaded) => {
    try {
      const option = { base64: true };
      if (camera) {
        const data = await camera.takePictureAsync(option);
        setPicture(data.base64);
        setImage(data.uri);
      } else {
        setPicture(uploaded);
        setImage(uploaded);
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
      <Header
        title="Point & Translate"
        navigation={navigation}
        settingsTooltip={settingsTooltip}
        setSettingsTooltip={setSettingsTooltip}
        setCameraTooltip={setCameraTooltip}
      />
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
              <Tooltip
                isVisible={screenTooltip}
                content={
                  <View>
                    <Text>Select your favorite target</Text>
                  </View>
                }
                onClose={() => {
                  setScreenTooltip(false);
                  setSettingsTooltip(true);
                }}
                placement="bottom"
                topAdjustment={
                  Platform.OS === "android" ? -StatusBar.currentHeight : 0
                }
              >
                <Text style={styles.selectText}>Select Language</Text>
              </Tooltip>
            </TouchableOpacity>

            <TouchableOpacity style={styles.languageButton}>
              <Tooltip
                isVisible={uploadTooltip}
                content={
                  <View>
                    <Text>Upload, homie!</Text>
                  </View>
                }
                onClose={() => {
                  setUploadTooltip(false);
                }}
                placement="bottom"
                topAdjustment={
                  Platform.OS === "android" ? -StatusBar.currentHeight : 0
                }
              >
                <PhotoPicker
                  setPicture={setPicture}
                  setImage={setImage}
                  setLoading={setLoading}
                />
              </Tooltip>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setScreenTooltip(true);
              }}
              style={{ margin: 10 }}
            >
              <MaterialIcons name="help" size={35} color="#032D38" />
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
            >
              <Tooltip
                isVisible={cameraTooltip}
                content={
                  <View>
                    <Text>Take a picture!</Text>
                  </View>
                }
                onClose={() => {
                  setCameraTooltip(false);
                  setUploadTooltip(true);
                }}
                placement="top"
                topAdjustment={
                  Platform.OS === "android" ? -StatusBar.currentHeight : 0
                }
              >
                <Text style={{ color: "#FC9E9C" }}>A</Text>
              </Tooltip>
            </TouchableOpacity>
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
