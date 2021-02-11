const TOGGLE_OCR = "TOGGLE_OCR";
const TOGGLE_LABELS = "TOGGLE_LABELS";
const TOGGLE_TOOLTIP = "TOGGLE_TOOLTIP";

export const toggleOCR = () => {
  return {
    type: TOGGLE_OCR,
  };
};

export const toggleLabels = () => {
  return {
    type: TOGGLE_LABELS
  }
}

export const toggleTooltip = (bool) => {
  return {
    type: TOGGLE_TOOLTIP,
    payload: bool
  }
}

const initialState = {
  handwriting: true,
  labels: false,
  tooltip: false
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
        labels: !state.labels
      }
    case TOGGLE_TOOLTIP: 
      return {
        ...state,
        tooltip: action.payload
      }
    default:
      return state;
  }
};

export default toggleReducer;
