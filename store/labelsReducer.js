
import { CLOUD_BASE_FUNCTION, PURPLE_SOCKS_KEY } from "@env";


const initialState = {
  id: 0,
  detectedLabels: [],
  error: null,
};

const DETECTED_LABELS = "DETECTED_LABELS";
const ERROR = "ERROR";
const EDIT_LABELS = "EDIT_LABELS";

export const detectedLabels = (source) => {
  return {
    type: DETECTED_LABELS,
    source,
  };
};

export const error = (error) => {
  return {
    type: ERROR,
    error,
  };
};

export const editLabels = (revLabels) => {
  return {
    type: EDIT_LABELS,
    revLabels,
  };
};

export const getLabels = (picture) => {
  return async (dispatch) => {
    try {
      let response = await fetch(
        CLOUD_BASE_FUNCTION + "getLabels?PURPLE_SOCKS_KEY=" + PURPLE_SOCKS_KEY,

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
                    maxResults: 5,
                    type: "LABEL_DETECTION",
                  },
                ],
              },
            ],
          }),
        }
      );

      const responseJSON = await response.json();

      const labels = await responseJSON.responses[0].labelAnnotations.map(
        (x) => x.description
      );

      if (labels) {
        dispatch(detectedLabels(labels));
      }
    } catch (err) {
      dispatch(error(err));
    }
  };
};

const labelReducer = (state = initialState, action) => {

  switch (action.type) {
    case DETECTED_LABELS:
      return {
        ...state,
        id: (state.id += 1),
        detectedLabels: action.source,
        error: null,
      };
    case ERROR:
      return {
        ...state,
        id: (state.id += 1),
        detectedLabels: [],
        error: action.error,
      };
    case EDIT_LABELS:
      return {
        ...state,
        detectedLabels: [action.revLabels],
        error: null,
      };
    default:
      return state;
  }
};

export default labelReducer;
