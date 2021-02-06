import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    screen: {
      flex: 1,
      alignContent: "center",
      alignItems: "center",
      backgroundColor: "#94B2BA",
    },
    originalContainer: {
      width: "90%",
      height: "35%",
      alignItems: "center",
      margin: 10,
      marginTop: 30,
      padding: 20,
      paddingTop: 5,
      borderRadius: 10,
      shadowColor: "black",
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      shadowOpacity: 0.26,
      elevation: 5,
      backgroundColor: "#006575",
    },
    translateContainer: {
      width: "90%",
      height: "40%",
      alignItems: "center",
      margin: 10,
      padding: 20,
      paddingTop: 5,
      borderRadius: 10,
      shadowColor: "black",
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      shadowOpacity: 0.26,
      elevation: 5,
      backgroundColor: "#006575",

    },
    header: {
      fontSize: 25,
      fontWeight: 'bold',
      padding: 8,
      color: "white"
    },
    cameraBtn: {
      margin: 10,
    },
    text: {
      color: "white"
    },
    audioButtonContainer: {
      flexDirection: "row",
      alignSelf: "flex-end"
    },
    // audioText: {
    //   alignSelf: "center",
    // }
  });
