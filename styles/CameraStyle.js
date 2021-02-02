import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: "transparent",
      flexDirection: "column",
      justifyContent: "space-between",
      margin: 10,
    },
    button: {
      flex: 0.1,
      alignSelf: "flex-end",
      alignItems: "center",
    },
    flipButton: {
      flex: 0.1,
      alignSelf: "flex-start",
    },
    shutterButton: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      padding: 40,
      alignSelf: "center",
      backgroundColor: "#D90E18",
      borderColor: "#B00000",
      borderBottomColor: "#AE2321",
      borderRadius: 50,
      borderWidth: 8,
      width: 80,
      height: 80,
      justifyContent: "center",
      margin: 20,
    },
    flipButtonText: {
      fontSize: 18,
      color: "white",
    },
  });
  