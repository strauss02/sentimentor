/************************ Constants ************************/

const request = "https://sentim-api.herokuapp.com/api/v1/";

/************************ Select Elements ************************/
const submitButton = document.querySelector("button");
const textArea = document.querySelector("#input-text");

const polarityText = document.querySelector("#polarity-text");
const chargeText = document.querySelector("#charge-text");
const resultHeaders = document.querySelector(".result-headers");

const errorText = document.querySelector(".error-text");

const loadingText = document.querySelector(".loading-section");

const errorImage = document.getElementById("error-img");

let inputText = textArea.value;

submitButton.addEventListener("click", handleSubmit);

/************************ Main Functions ************************/
//TODO: Add function docs
//TODO: disable ability to send empty text

async function handleSubmit() {
  assertTextFilled();
  hideLoadingAnimation(false);
  inputText = textArea.value;
  const data = await getResponse(inputText);
  hideLoadingAnimation(true);

  let dataResults = data.result;

  polarityText.innerText = `Polarity : ${dataResults.polarity}`;
  chargeText.innerText = `Charge : ${dataResults.type}`;
  colorByPolarity(dataResults.polarity);
}

//TODO: Fix annoying auto-formatting
function colorByPolarity(polarity) {
  resultHeaders.style.color =
    polarity === 0 ? "gray" : polarity > 0 ? "green" : "red";
}

function renderError(message) {
  errorText.innerText = message;
}

async function getResponse(text) {
  try {
    const response = await fetch(request, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    assertResponseOk(response);
    const data = await response.json();
    console.log(data);
    console.log(response.status);
    showErrorCat(response.status);
    return data;
  } catch (error) {
    console.log("there was an error" + error.message);
    renderError(
      `Whoops! Something went wrong. try analaysing THAT! error message: ${error.message}`
    );
  }
}

function assertTextFilled() {
  if (textArea.validity.valueMissing) {
    renderError("you must enter some kinda text man");
    throw "not filled";
  }
}

function assertResponseOk(response) {
  if (!response.ok) {
    console.log(response.status);
    showErrorCat(response.status);
    hideLoadingAnimation(true);
  }
}

function hideLoadingAnimation(state) {
  loadingText.hidden = state;
}

function showErrorCat(code) {
  errorImage.hidden = false;
  errorImage.src = `https://http.cat/${code}`;
}
