import React from "react";
import { Picker } from "@react-native-picker/picker";
import { setTarget } from "../store/target";
import { connect } from "react-redux";

class TargetPicker extends React.Component {
  render() {
    console.log("PROPS FROM PICKER", this.props.target);
    const { target, setTarget } = this.props;
    return (
      <Picker
        selectedValue={target}
        style={{ height: 50, width: 200 }}
        onValueChange={(itemValue) => setTarget(itemValue)}
      >
        <Picker.Item label="Russian" value="ru" />
        <Picker.Item label="Spanish" value="es" />
        <Picker.Item label="Portuguese" value="pt" />
      </Picker>
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
