const TOGGLE_OCR = "TOGGLE_OCR";

export const toggleOCR = () => {
  return {
    type: TOGGLE_OCR,
  };
};

const initialState = {
  handwriting: true,
};

const toggleReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_OCR:
      return {
        ...state,
        handwriting: !state.handwriting,
      };
    default:
      return state;
  }
};

export default toggleReducer;
