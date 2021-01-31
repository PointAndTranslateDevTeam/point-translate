//If you'd like to see all possible languages we can translate into
export default getLangs = async () => {
  try {
    let response = await fetch(
      "https://translation.googleapis.com/language/translate/v2/languages/?key=" +
        API_KEY,
      {
        method: "GET",
      }
    );
    const jsonResponse = await response.json();
    console.log("response", jsonResponse);
  } catch (err) {
    console.error(err.message);
  }
};
