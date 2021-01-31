import { API_KEY } from "../secrets.js";
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
                    type: "DOCUMENT_TEXT_DETECTION",
                  },
                ],
              },
            ],
          }),
        }
      );
      const responseJSON = await response.json();
      const res = dispatch(detectedText(responseJSON.responses[0].fullTextAnnotation.text))
      return res;
      // if (
      //   responseJSON.responses[0] === {} ||
      //   !responseJSON.responses[0].fullTextAnnotation
      // ) {
      //   return "Sorry, we did not detect any text in your image.";
      // } else {
      //   dispatch(
      //     detectedText(responseJSON.responses[0].fullTextAnnotation.text)
      //   );
      // }
    } catch (err) {
      console.error(err);
    }
  };
};

const sourceReducer = (state = initialState, action) => {
  switch (action.type) {
    case DETECTED_TEXT:
      return {
        detectedText: action.source,
      };
    default:
      return state;
  }
};

export default sourceReducer;
