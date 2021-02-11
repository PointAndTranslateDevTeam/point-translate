import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import
  Settings
 from "../modals/SettingsModal";

const Header = (props) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <View style={styles.button}>
          <TouchableOpacity
            styles={styles.btn}
            onPress={() => props.navigation.navigate("Home")}
          >
            <AntDesign name="home" size={28} color="white" />
          </TouchableOpacity>
        </View>
        <View styles={styles.title}>
          <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
        <View style={styles.button}>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <MaterialIcons name={"settings"} size={28} color={"white"} />
        </TouchableOpacity>
        </View>
        <Settings showModal={showModal} setModal={setShowModal} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 90,
    paddingTop: 40,
    backgroundColor: "#FB7573",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  container: {
    flexDirection: "row",
    flex: 1,
    justifyContent: 'space-around',
  },
  headerTitle: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    width: "100%",
    fontFamily: "Staatliches",
  },
  button: {
    flex: 0.5,
    width: "100%",
    alignItems: "center",
    height: 50,
    marginTop: 5,
    marginBottom: 3,
    alignContent: 'center',
    paddingTop: 5
  },
});
export default Header;
