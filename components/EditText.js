import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  Text
} from "react-native";
import { connect } from "react-redux";

const EditText = ({navigation, orgText, showEdit, setShowEdit}) => {
  return (

    <Modal transparent={true} visible={showEdit} animationType="slide">
      <View style={styles.screenContainer}>
        <View style={styles.screen}>
          <TextInput multiline={true}>{orgText}</TextInput>
          <View>
          <TouchableOpacity
            onPress={() => {
              setShowEdit(false); 
              navigation.navigate('Camera')}}
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
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    orgText: state.source.detectedText,
  };
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
  },
  screen: {
    backgroundColor: "#fff",
    alignItems: "center",
    backgroundColor: "lightgray",
    margin: 50,
    padding: 40,
    borderRadius: 10,
    height: "50%",
    alignContent: "center",
    flexDirection: "column",
    justifyContent: "center",
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

export default connect(mapStateToProps)(EditText);
