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

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const EditText = ({ navigation, orgText, editText, showEdit, setShowEdit }) => {
  const [newText, setNewText] = useState("");

  const editTextInputHandler = (edittedText) => {
    setNewText(edittedText);
  };
  const inputEditText = async () => {
    try {
      await editText(newText);
      setShowEdit(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setNewText(orgText);
  }, [orgText]);

  return (
    <Modal transparent={true} visible={showEdit} animationType="slide">
      <DismissKeyboard>
        <View style={styles.screenContainer}>
          <View style={styles.screen}>
            <TouchableOpacity onPress={() => setShowEdit(false)}>
              <MaterialIcons
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
                <Text style={styles.headerText}>Tap to edit:</Text>
              </View>
              <View style={styles.textInput}>
                <TextInput
                  onChangeText={editTextInputHandler}
                  multiline={true}
                  value={newText}
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
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    editText: (revText) => dispatch(editText(revText)),
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
    fontWeight: "600",
    paddingBottom: 10,
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
  },
  topContainer: {
    flexDirection: "row",
  },
});

export default connect(mapStateToProps, mapDispatchtoProps)(EditText);
