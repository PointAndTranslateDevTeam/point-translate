import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fb7573",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 8,
    backgroundColor: "#fb7573",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 20,
  },
  titleText: {
    color: "#032D38",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 53,
    fontFamily: "Staatliches"
  },
  headlineText: {
    color: "#032D38",
    textAlign: "center",
    fontSize: 12.5,
  },
  targetPicker: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },

  tapForCameraButton: {
    width: 130,
    borderRadius: 4,
    backgroundColor: "#032D38",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  tapForCameraText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Staatliches",
    fontSize: 20
  },

  image: {
    width: 375,
    height: 275,
    resizeMode: "contain",
    marginVertical: 0,
  },
  helpButtonContainer: {
    flex: 1,
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    padding: 10,
  },
});
