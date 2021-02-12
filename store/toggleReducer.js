const TOGGLE_OCR = "TOGGLE_OCR";
const TOGGLE_LABELS = "TOGGLE_LABELS";

//toggleReducer has been modified to include labels.
//This might not be necessary or even the best way to do it, feel free to modify.

export const toggleOCR = () => {
  return {
    type: TOGGLE_OCR,
  };
};

export const toggleLabels = () => {
  return {
    type: TOGGLE_LABELS,
  };
};

const initialState = {
  handwriting: true,
  labels: false,
};

const toggleReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_OCR:
      return {
        ...state,
        handwriting: !state.handwriting,
      };
    case TOGGLE_LABELS:
      return {
        ...state,
        labels: !state.labels,
      };
    default:
      return state;
  }
};

export default toggleReducer;
