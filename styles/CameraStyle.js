import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  topButtons: {
    flex: 1,
    padding: 20,
    height: 500,
    flexDirection: 'row',
    justifyContent: 'space-between'
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

    alignSelf: "flex-start",
  },
  langButton: {
    alignSelf: "flex-start",
    fontSize: 18,
  },
  shutterButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    padding: 40,
    alignSelf: "center",
    backgroundColor: "#D90E18",
    // backgroundColor: "#009FB8",
    backgroundColor: "#FC9E9C",
    // borderColor: "#006575",
    borderColor: "#FB7573",
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
