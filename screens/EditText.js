import React, { useState, useEffect } from "react";
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
import { editText } from "../store/source";

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
            <Text style={{ fontSize: 30 }}>Detected text:</Text>
            <TextInput
              onChangeText={editTextInputHandler}
              multiline={true}
              value={newText}
            ></TextInput>
            <View>
              <TouchableOpacity
                onPress={() => {
                  // console.log(newText)
                  inputEditText();
                  navigation.navigate("Translation");
                }}
                style={{
                  width: 130,
                  borderRadius: 4,
                  backgroundColor: "#14274e",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 40,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Translate
                </Text>
              </TouchableOpacity>
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
    opacity: 0.9,
  },
  screen: {
    backgroundColor: "#fff",
    alignItems: "center",
    backgroundColor: "white",
    margin: 50,
    padding: 40,
    borderRadius: 10,
    height: "70%",
    alignContent: "center",
    flexDirection: "column",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
  },
  settingContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    alignItems: "center",
    alignContent: "center",
  },
  text: {
    margin: 20,
  },
});

export default connect(mapStateToProps, mapDispatchtoProps)(EditText);
