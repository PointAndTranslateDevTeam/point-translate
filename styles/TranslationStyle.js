import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    screen: {
      flex: 1,
      alignContent: "center",
      alignItems: "center",
      marginTop: 10,
    },
    textContainer: {
      width: "90%",
      height: "40%",
      alignItems: "center",
      margin: 10,
      padding: 20,
      borderRadius: 10,
      shadowColor: "black",
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      shadowOpacity: 0.26,
      elevation: 5,
      backgroundColor: "white",
      paddingTop: 1,
    },
    header: {
      fontSize: 25,
      fontWeight: 'bold',
      padding: 8
    },
    cameraBtn: {
      margin: 10,
    }
  });
