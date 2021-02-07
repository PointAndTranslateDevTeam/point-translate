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
    paddingTop: 36,
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
    fontSize: 18,
    fontWeight: "bold",
    height: 50,
    width: "100%",
    marginTop: "25%",
  },
  button: {
    flex: 0.5,
    alignSelf: "flex-start",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginTop: 10,
  },
});
export default TranslateHeader;
