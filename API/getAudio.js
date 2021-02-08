import { API_KEY } from "../secrets.js";
import {Audio} from 'expo-av';

//this function calls Google's text-to-speech API-- 
//if and when there is no issue with expo-av on iOS, 
//we can implement this function with expo-av rather than expo-speech.

const getAudio = async (string) => {
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

      let mimeType = "data:audio/mp3;base64,"
      let uri = mimeType + jsonResponse.audioContent;
      console.log("before error");
      const { sound: playbackObject } = await Audio.Sound.createAsync (    
          { uri: uri },
          { shouldPlay: true }
      );
      await playbackObject.playAsync();
      return uri;
    } catch (err) {
      console.log(err);
    }
  };

  export default getAudio