const initialState = {
  detectedText: "",
};

const DETECTED_TEXT = "DETECTED_TEXT";

export const detectedText = (source) => {
  return {
    type: DETECTED_TEXT,
    source,
  };
};

const sourceReducer = (state = initialState, action) => {
  switch (action.type) {
    case DETECTED_TEXT:
      return {
        //check what recognizedText is
        detectedText: action.source.recognizedText,
      };
    default:
      return state;
  }
};

export default sourceReducer;
