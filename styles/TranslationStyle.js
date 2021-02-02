import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    screen: {
      flex: 1,
      alignContent: "center",
      alignItems: "center",
      marginTop: 10,
    },
    textContainer: {
      width: "80%",
      height: "35%",
      alignItems: "center",
      margin: 10,
      padding: 10,
      borderRadius: 10,
      shadowColor: "black",
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      shadowOpacity: 0.26,
      elevation: 5,
      backgroundColor: "white",
      padding: 20,
    },
    header: {
      fontSize: 50,
    },
    cameraBtn: {
      marginTop: 50,
    }
  });