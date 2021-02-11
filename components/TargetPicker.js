import React from "react";
import { Picker } from "@react-native-picker/picker";
import { setTarget } from "../store/targetReducer";
import { connect } from "react-redux";
import { View } from "react-native";
import Languages from "../languages";

class TargetPicker extends React.Component {
  render() {
    const { target, setTarget } = this.props;
    let keys = Object.keys(Languages);
    return (
      <View style={{ marginTop: 0, marginBottom: 100, marginHorizontal: 10 }}>
        <Picker
          selectedValue={target}
          style={{ height: 75, width: 220 }}
          onValueChange={(itemValue) => setTarget(itemValue)}
        >
          {keys.map((key) => (
            <Picker.Item key={key} label={Languages[key]} value={key} />
          ))}
        </Picker>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    target: state.target,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTarget: (lang) => dispatch(setTarget(lang)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TargetPicker);
