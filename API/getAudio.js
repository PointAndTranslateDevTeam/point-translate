import { API_KEY } from "../secrets.js";

export default getAudio = async (string) => {
    console.log("heytranslate");
    // console.log("text", orgText);
    try {
      let response = await fetch(
        "https://texttospeech.googleapis.com/v1/text:synthesize?key=" +
          API_KEY,
        {
          method: "POST",
          body: JSON.stringify({
            input: {text: string},
            voice: {languageCode: 'en-US', ssmlGender: 'FEMALE'},
            audioConfig: {audioEncoding: 'MP3'},
          }),
        }
      );
      const jsonResponse = await response.json();
      console.log("responded", jsonResponse);
      return jsonResponse;
    } catch (err) {
      console.log(err);
    }
  };