import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fb7573",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#fb7573",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 20,
  },
  titleText: {
    color: "#14274e",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 42,
  },
  headlineText: {
    color: "#14274e",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
    padding: 20,
  },
  targetPicker: {
    width: "50%",
  },

  tapForCameraButton: {
    width: 130,
    borderRadius: 4,
    backgroundColor: "#14274e",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  tapForCameraText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },

  image: {
    width: 250,
    height: 185,
    resizeMode: "contain",
    marginVertical: 0,
  },
  helpButtonContainer: {
    justifyContent: "flex-end",
  },
});
