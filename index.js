/************************ Constants ************************/

const request = "https://sentim-api.herokuapp.com/api/v1/";

/************************ Select Elements ************************/
const submitButton = document.querySelector("button");
const textArea = document.querySelector("#input-text");

const polarityText = document.querySelector("#polarity-text");
const chargeText = document.querySelector("#charge-text");
const resultHeaders = document.querySelector(".result-headers");
const resultContainer = document.querySelector(".results-container");

const errorText = document.querySelector(".error-text");

const loadingText = document.querySelector(".loading-section");

const errorImage = document.getElementById("error-img");

let inputText = textArea.value;

submitButton.addEventListener("click", handleSubmit);

/************************ Main Functions ************************/
//TODO: Add function docs

async function handleSubmit() {
  assertTextFilled();
  hideElements([loadingText, resultContainer], [false, true]);
  cleanErrors();
  inputText = textArea.value;
  const data = await getResponse(inputText);
  hideElements([loadingText, resultContainer], [true, false]);

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
    showErrorCat(response.status);
    return data;
  } catch (error) {
    renderError(
      `Whoops! Something went wrong. try analaysing THAT! error message: ${error.message}`
    );
  }
}

//Checks if textarea isn't empty
function assertTextFilled() {
  if (textArea.validity.valueMissing) {
    renderError("you must enter some kinda text, man");
    throw "not filled";
  }
}

function assertResponseOk(response) {
  if (!response.ok) {
    console.log(response.status);
    showErrorCat(response.status);
    hideElements([loadingText], [true]);
  }
}

//recieves two arrays, one with elements, the second with states. they are matched by index.
function hideElements(elements, states) {
  elements.forEach(function (element, index) {
    element.hidden = states[index];
  });
}

function showErrorCat(code) {
  hideElements([errorImage], [false]);
  errorImage.src = `https://http.cat/${code}`;
}

function cleanErrors() {
  errorText.textContent = "";
}
