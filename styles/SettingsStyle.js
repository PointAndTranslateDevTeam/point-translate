import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
  },
  screen: {
    backgroundColor: "#fff",
    alignItems: "center",
    backgroundColor: "#94B2BA",
    margin: 50,
    padding: 10,
    borderRadius: 10,
    height: "30%",
    alignContent: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  settingContainer: {
    // backgroundColor: 'white',
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    alignItems: 'center',
    alignContent: 'center'
  },
  button: {
    width: 100,
    borderRadius: 4,
    backgroundColor: "#fb7573",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    margin: 30,
  },
  text: {
    margin: 20,
    backgroundColor: "red"
  },
  toggleContainer: {
    // backgroundColor: "white"

  }
});
