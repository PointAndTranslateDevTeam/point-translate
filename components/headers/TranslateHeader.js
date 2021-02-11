import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const TranslateHeader = (props) => {
  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <View style={styles.button}>
          <TouchableOpacity
            styles={styles.btn}
            onPress={() => props.navigation.navigate("Camera")}
          >
            <AntDesign name="camerao" size={28} color="white" />
          </TouchableOpacity>
        </View>
        <View styles={styles.title}>
          <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
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
    alignSelf: "flex-start",
    width: "100%",
    alignItems: "center",
    height: 50,
    marginTop: 5,
    paddingTop: 5,
    marginBottom: 3,
  },
});
export default TranslateHeader;
