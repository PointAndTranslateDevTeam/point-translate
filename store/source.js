import {PURPLE_SOCKS_KEY} from "@env";


const initialState = {
  id: 0,
  detectedText: "",
  error: null,
};

const DETECTED_TEXT = "DETECTED_TEXT";
const EDIT_TEXT = "EDIT_TEXT";
const ERROR = "ERROR";
const CLEAR_TEXT = "CLEAR_TEXT";

export const detectedText = (source) => {
  return {
    type: DETECTED_TEXT,
    source,
  };
};

export const error = (error) => {
  return {
    type: ERROR,
    error,
  };
};
export const editText = (revText) => {
  return {
    type: EDIT_TEXT,
    revText,
  };
};

export const clear = () => {
  return {
    type: CLEAR_TEXT
  };
}

export const getText = (picture, ocrType) => {
  return async (dispatch) => {
    try {
      let response = await fetch(
        //change URL once functions is deployed
        "http://192.168.42.175:5001/point-translate-303720/us-central1/getText?PURPLE_SOCKS_KEY=" + PURPLE_SOCKS_KEY,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requests: [
              {
                image: {
                  content: picture,
                },
                features: [
                  {
                    type: ocrType,
                  },
                ],
              },
            ],
          }),
        }
      );

      const responseJSON = await response.json();
      const text = await responseJSON.responses[0].fullTextAnnotation.text;
      if (text) {
        dispatch(detectedText(text));
      }
    } catch (err) {
      dispatch(error(err));
    }
  };
};

export const clearText = () => {
  return (dispatch) => {
    dispatch(clear());
  };
}

const sourceReducer = (state = initialState, action) => {
  switch (action.type) {
    case DETECTED_TEXT:
      return {
        ...state,
        id: (state.id += 1),
        detectedText: action.source,
        error: null,
      };
    case ERROR:
      return {
        ...state,
        id: (state.id += 1),
        detectedText: "",
        error: action.error,
      };
    case EDIT_TEXT:
      return {
        ...state,
        detectedText: action.revText,
        error: null,
      };

      case CLEAR_TEXT:
        return {
        ...state,
        detectedText: "",
        error: null,
        };
    default:
      return state;
  }
};

export default sourceReducer;
