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
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Edit detected text:</Text>
            <View style={styles.textInput}>
            <TextInput
              onChangeText={editTextInputHandler}
              multiline={true}
              value={newText}
            ></TextInput>
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => {
                  inputEditText();
                  navigation.navigate("Translation");
                }}
                style={{
                  width: 100,
                  borderRadius: 4,
                  backgroundColor: "#fb7573",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 35,
                  marginVertical: 5
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
    alignContent: 'center',
    alignItems:'center'
  },
  screen: {
    color: "#fff",
    alignItems: "center",
    backgroundColor: "#94B2BA",
    margin: 50,
    padding: 40,
    borderRadius: 10,
    height: "75%",
    width: "90%",
    alignContent: "center",
    flexDirection: "column",
    justifyContent: "space-around",
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
  textInput: {
    height: "80%",
    width: "90%"
  }
});

export default connect(mapStateToProps, mapDispatchtoProps)(EditText);
