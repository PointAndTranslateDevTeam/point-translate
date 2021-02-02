import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
  },
  screen: {
    backgroundColor: "#fff",
    alignItems: "center",
    backgroundColor: "lightgray",
    margin: 50,
    padding: 40,
    borderRadius: 10,
    height: "50%",
    alignContent: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  settingContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    alignItems: 'center',
    alignContent: 'center'
  },
  text: {
    margin: 20,
  },
});
