import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Tooltip from "react-native-walkthrough-tooltip";

const TranslateHeader = (props) => {
  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <View style={styles.button}>
          <TouchableOpacity
            styles={styles.btn}
            onPress={() => props.navigation.navigate("Camera")}
          >
            <Tooltip
              isVisible={props.backTooltip}
              content={
                <View>
                  <Text style={styles.walkthrough}>Or go back to the camera screen to translate another image!</Text>
                </View>
              }
              onClose={() => {
                props.setBackTooltip(false);
              }}
              placement="bottom"
              topAdjustment={
                Platform.OS === "android" ? -StatusBar.currentHeight : 0
              }
            >
              <AntDesign name="camerao" size={28} color="white" />
            </Tooltip>
          </TouchableOpacity>
        </View>
        <View styles={styles.title}>
          <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              props.setScreenTooltip(true);
            }}
          >
            <MaterialIcons name="help" size={30} color="white" />
          </TouchableOpacity>
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
  walkthrough: {
    fontSize: 16
  }
});
export default TranslateHeader;
