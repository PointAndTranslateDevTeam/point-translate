import React from "react";
import { Picker } from "@react-native-picker/picker";
import { setTarget } from "../store/target";
import { connect } from "react-redux";
import { View } from "react-native";

class TargetPicker extends React.Component {
  render() {
    const { target, setTarget } = this.props;
    return (
      <View style={{ marginTop: 0, marginBottom: 75,
      marginHorizontal: 10,
      }}>
        <Picker
          selectedValue={target}
          style={{ height: 75, width: 200 }}
          onValueChange={(itemValue) => setTarget(itemValue)}
        >
            <Picker.Item label="Afrikaans" value="af" />
            <Picker.Item label="Albanian" value="sq" />
            <Picker.Item label="Amharic" value="am" />
            <Picker.Item label="Arabic" value="ar" />
            <Picker.Item label="Armenian" value="hy" />
            <Picker.Item label="Azerbaijani" value="az" />
            <Picker.Item label="Basque" value="eu" />
            <Picker.Item label="Belarusian" value="be" />
            <Picker.Item label="Bengali" value="bn" />
            <Picker.Item label="Bosnian" value="bs" />
            <Picker.Item label="Bulgarian" value="bg" />
            <Picker.Item label="Catalan" value="ca" />
            <Picker.Item label="Cebuano" value="ceb" />
            <Picker.Item label="Chinese (Simplified)" value="zh-CN" />
            <Picker.Item label="Chinese (Traditional)" value="zh-TW" />
            <Picker.Item label="Corsican" value="co" />
            <Picker.Item label="Croatian" value="hr" />
            <Picker.Item label="Czech" value="cs" />
            <Picker.Item label="Danish" value="da" />
            <Picker.Item label="Dutch" value="nl" />
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Esperanto" value="eo" />
            <Picker.Item label="Estonian" value="et" />
            <Picker.Item label="Finnish" value="fi" />
            <Picker.Item label="French" value="fr" />
            <Picker.Item label="Frisian" value="fy" />
            <Picker.Item label="Galician" value="gl" />
            <Picker.Item label="Georgian" value="ka" />
            <Picker.Item label="German" value="de" />
            <Picker.Item label="Greek" value="el" />
            <Picker.Item label="Gujarati" value="gu" />
            <Picker.Item label="Haitian Creole" value="ht" />
            <Picker.Item label="Hausa" value="ha" />
            <Picker.Item label="Hawaiian" value="haw" />
            <Picker.Item label="Hebrew" value="he" />
            <Picker.Item label="Hindi" value="hi" />
            <Picker.Item label="Hmong" value="hmn" />
            <Picker.Item label="Hungarian" value="hu" />
            <Picker.Item label="Icelandic" value="is" />
            <Picker.Item label="Igbo" value="ig" />
            <Picker.Item label="Indonesian" value="id" />
            <Picker.Item label="Irish" value="ga" />
            <Picker.Item label="Italian" value="it" />
            <Picker.Item label="Japanese" value="ja" />
            <Picker.Item label="Javanese" value="jv" />
            <Picker.Item label="Kannada" value="kn" />
            <Picker.Item label="Kazakh" value="kk" />
            <Picker.Item label="Khmer" value="km" />
            <Picker.Item label="Kinyarwanda" value="rw" />
            <Picker.Item label="Korean" value="ko" />
            <Picker.Item label="Kurdish" value="ku" />
            <Picker.Item label="Kyrgyz" value="ky" />
            <Picker.Item label="Lao" value="lo" />
            <Picker.Item label="Latin" value="la" />
            <Picker.Item label="Latvian" value="lv" />
            <Picker.Item label="Lithuanian" value="lt" />
            <Picker.Item label="Luxembourgish" value="lb" />
            <Picker.Item label="Macedonian" value="mk" />
            <Picker.Item label="Malagasy" value="mg" />
            <Picker.Item label="Malay" value="ms" />
            <Picker.Item label="Malayalam" value="ml" />
            <Picker.Item label="Maltese" value="mt" />
            <Picker.Item label="Maori" value="mi" />
            <Picker.Item label="Marathi" value="mr" />
            <Picker.Item label="Mongolian" value="mn" />
            <Picker.Item label="Myanmar (Burmese)" value="my" />
            <Picker.Item label="Nepali" value="ne" />
            <Picker.Item label="Norwegian" value="no" />
            <Picker.Item label="Nyanja (Chichewa)" value="ny" />
            <Picker.Item label="Odia (Oriya)" value="or" />
            <Picker.Item label="Pashto" value="ps" />
            <Picker.Item label="Persian" value="fa" />
            <Picker.Item label="Polish" value="pl" />
            <Picker.Item label="Portuguese (Portugal, Brazil)" value="pt" />
            <Picker.Item label="Punjabi" value="pa" />
            <Picker.Item label="Romanian" value="ro" />
            <Picker.Item label="Russian" value="ru" />
            <Picker.Item label="Samoan" value="sm" />
            <Picker.Item label="Scots Gaelic" value="gd" />
            <Picker.Item label="Serbian" value="sr" />
            <Picker.Item label="Sesotho" value="st" />
            <Picker.Item label="Shona" value="sn" />
            <Picker.Item label="Sindhi" value="sd" />
            <Picker.Item label="Sinhala (Sinhalese)" value="si" />
            <Picker.Item label="Slovak" value="sk" />
            <Picker.Item label="Slovenian" value="sl" />
            <Picker.Item label="Somali" value="so" />
            <Picker.Item label="Spanish" value="es" />
            <Picker.Item label="Sundanese" value="su" />
            <Picker.Item label="Swahili" value="sw" />
            <Picker.Item label="Swedish" value="sv" />
            <Picker.Item label="Tagalog (Filipino)" value="tl" />
            <Picker.Item label="Tajik" value="tg" />
            <Picker.Item label="Tamil" value="ta" />
            <Picker.Item label="Tatar" value="tt" />
            <Picker.Item label="Telegu" value="te" />
            <Picker.Item label="Thai" value="th" />
            <Picker.Item label="Turkish" value="tr" />
            <Picker.Item label="Turkmen" value="tk" />
            <Picker.Item label="Ukrainian" value="uk" />
            <Picker.Item label="Urdu" value="ur" />
            <Picker.Item label="Uyghur" value="ug" />
            <Picker.Item label="Uzbek" value="uz" />
            <Picker.Item label="Vietnamese" value="vi" />
            <Picker.Item label="Welsh" value="cy" />
            <Picker.Item label="Xhosa" value="xh" />
            <Picker.Item label="Yiddish" value="yi" />
            <Picker.Item label="Yoruba" value="yo" />
            <Picker.Item label="Zulu" value="zu" />
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
