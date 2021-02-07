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
            <View style = {styles.editContainer}>
              <View style={styles.topContainer} >
             <TouchableOpacity
                style={styles.button}
                onPress={() => props.setShowConfirmation(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity><Text style={styles.headerText}>Tap to edit:</Text>
              </View>
            <View style={styles.textInput}>
              <TextInput
                onChangeText={editTextInputHandler}
                multiline={true}
                value={newText}
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
    justifyContent: "space-around",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
  },
  editContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "80%",
    width: "75%",
    alignItems: "center",
  },
  textInput: {
    height: "85%",
    width: "100%",
    paddingBottom: 10,
    color: "white",
    fontWeight: "500"
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
  topContainer : {
    backgroundColor: "green",
    flexDirection: "row",
  }
});

export default connect(mapStateToProps, mapDispatchtoProps)(EditText);
