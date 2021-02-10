import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { connect } from "react-redux";
import { editText } from "../../store/source";
import { editLabels } from "../../store/label";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const EditText = ({
  navigation,
  orgText,
  editText,
  showEdit,
  setShowEdit,
  editLabels,
  labels,
  orgLabels,
}) => {
  const [newText, setNewText] = useState(null);

  const editTextInputHandler = (edittedText) => {
    setNewText(edittedText);
  };
  const inputEditText = async () => {
    try {
      console.log("NEWTEXT, ", newText);
      labels ? await editLabels(newText) : await editText(newText);
      setShowEdit(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log("here");
    setNewText(orgLabels.join(", "));
  }, [orgLabels]);

  useEffect(() => {
    setNewText(orgText);
  }, [orgText]);

  return (
    <Modal transparent={true} visible={showEdit} animationType="slide">
      <DismissKeyboard>
        <View style={styles.screenContainer}>
          {console.log('NEWWWW',newText)}
          <View style={styles.screen}>
            <TouchableOpacity>
              <MaterialIcons
                onPress={() => setShowEdit(false)}
                name="clear"
                size={30}
                color="#006575"
                style={{
                  position: "absolute",
                  left: 115,
                  top: 0,
                }}
              />
            </TouchableOpacity>
            <View style={styles.editContainer}>
              <View style={styles.topContainer}>
                <Text style={styles.headerText}>Tap text to edit:</Text>
              </View>
              <View style={styles.textInput}>
                <TextInput
                  onChangeText={editTextInputHandler}
                  multiline={true}
                  value={labels ? newText : newText}
                  style={styles.text}
                ></TextInput>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    inputEditText();
                    navigation.navigate("Translation");
                  }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Translate</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </DismissKeyboard>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    orgText: state.source.detectedText,
    labels: state.toggle.labels,
    orgLabels: state.labels.detectedLabels,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    editText: (revText) => dispatch(editText(revText)),
    editLabels: (revLabels) => dispatch(editLabels(revLabels)),
  };
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  screen: {
    backgroundColor: "#94B2BA",
    alignItems: "center",
    margin: 50,
    borderRadius: 10,
    height: "75%",
    width: "90%",
    justifyContent: "center",
  },
  editContainer: {
    flexDirection: "column",
    justifyContent: "center",
    height: "90%",
    width: "75%",
    alignItems: "center",
  },
  textInput: {
    height: "75%",
    width: "100%",
    paddingBottom: 10,
  },
  text: {
    color: "white",
    fontWeight: "500",
    paddingBottom: 10,
    fontSize: 16,
  },
  button: {
    width: 100,
    height: 37,
    borderRadius: 4,
    backgroundColor: "#fb7573",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    paddingBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  topContainer: {
    flexDirection: "row",
  },
});

export default connect(mapStateToProps, mapDispatchtoProps)(EditText);
