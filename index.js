/************************ Constants ************************/

const request = "https://sentim-api.herokuapp.com/api/v1/";
const text = `We have been through much darker times than these, and somehow each generation of Americans carried us through to the other side," he said. "Not by sitting around and waiting for something to happen, not by leaving it to others to do something, but by leading that movement for change themselves. And if you do that, if you get involved, and you get engaged, and you knock on some doors, and you talk with your friends, and you argue with your family members, and you change some minds, and you vote, something powerful happens.`;

/************************ Select Elements ************************/
const submitButton = document.querySelector("button");
const textArea = document.querySelector("#input-text");

const polarityText = document.querySelector("#polarity-text");
const chargeText = document.querySelector("#charge-text");
const resultHeaders = document.querySelector(".result-headers");

let inputText = textArea.value;

submitButton.addEventListener("click", handleSubmit);

/************************ Main Functions ************************/
//TODO: Add function docs
//TODO: disable ability to send empty text

async function handleSubmit() {
  inputText = textArea.value;
  const data = await getResponse(inputText);
  let dataResults = data.result;
  console.log(dataResults);
  console.log(dataResults.polarity);
  console.log(dataResults.type);
  polarityText.innerText = `Polarity : ${dataResults.polarity}`;
  chargeText.innerText = `Charge : ${dataResults.type}`;
  colorByPolarity(dataResults.polarity);
}

//TODO: Fix annoying auto-formatting
function colorByPolarity(polarity) {
  resultHeaders.style.color =
    polarity === 0 ? "gray" : polarity > 0 ? "green" : "red";
}

async function getResponse(text) {
  const response = await fetch(request, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  const data = await response.json();

  console.log(data);
  return data;
}
