import { API_KEY } from "../secrets.js";

const initialState = {
  detectedText: "",
  error: null,
};

const DETECTED_TEXT = "DETECTED_TEXT";
const CLEAR_TEXT = "CLEAR_TEXT";
const ERROR = "ERROR";

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
export const clearText = () => {
  return {
    type: CLEAR_TEXT,
  };
};

export const getText = (picture) => {

  return async (dispatch) => {
    try {
      let response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" + API_KEY,
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
                    type: "TEXT_DETECTION",
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

const sourceReducer = (state = initialState, action) => {
  switch (action.type) {
    case DETECTED_TEXT:
      return {
        ...state,
        detectedText: action.source,
        error: null,
      };
    case ERROR:
      return { ...state, detectedText: "", error: action.error };
    case CLEAR_TEXT:
      return initialState;
    default:
      return state;
  }
};

export default sourceReducer;
