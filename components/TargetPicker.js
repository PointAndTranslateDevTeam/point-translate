import React from "react";
import { Picker } from "@react-native-picker/picker";

class TargetPicker extends React.Component {
  state = {
    target: "es",
  };
  render() {
    const { target } = this.state;
    return (
      <Picker
        selectedValue={target}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue, itemIndex) =>
          this.setState({ target: itemValue })
        }
      >
        <Picker.Item label="Russian" value="ru" />
        <Picker.Item label="Spanish" value="es" />
      </Picker>
    );
  }
}

export default TargetPicker;
