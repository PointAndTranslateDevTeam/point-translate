import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    contentContainer: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "space-around",
      alignItems: "center",
    },
    titleText: {
      color: "#14274e",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 36,
    },
    targetPicker: { width: "50%" },
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
    }
  });