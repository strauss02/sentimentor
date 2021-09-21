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

/********* Event Listeners *********/

submitButton.addEventListener("click", handleSubmit);

/************************ Main Functions ************************/

/**
 * Handles the click event on the submit button. Hides the results section and reaveals a loading animation. when results return, it does the reverse.
 */
async function handleSubmit() {
  assertTextFilled();
  hideElements([loadingText, resultContainer], [false, true]);
  cleanPrevious();
  let inputText = textArea.value;
  const data = await getResponse(inputText);
  hideElements([loadingText, resultContainer], [true, false]);
  let dataResults = data.result;
  renderResults(dataResults);
}

/**
 * Renders the results in the DOM. Adds text to the appropriate section and calls colorByPolarity.
 * @param {Object} results
 */
function renderResults(results) {
  polarityText.innerText = `Polarity : ${results.polarity}`;
  chargeText.innerText = `Charge : ${results.type}`;
  colorByPolarity(results.polarity);
}

/**
 *  Colors the results text according to the polarity passed in.
 * @param {number} polarity - the polarity rating recieved from the API
 */
function colorByPolarity(polarity) {
  resultHeaders.style.color =
    polarity === 0 ? "gray" : polarity > 0 ? "green" : "red";
}

/**
 * Displays an error message in a designated section.
 * @param {String} message - the error message to display.
 */
function renderError(message) {
  errorText.innerText = message;
}

/**
 * Sends an http request to the SENTIM-API.
 * @param {String} text - the string to be sent for analysation
 * @returns {Object} the response, after it was converted by .json() method
 */
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
    showErrorCat(response.status);
    const data = await response.json();
    return data;
  } catch (error) {
    renderError(
      `Whoops! Something went wrong. try analaysing THAT! error message: ${error.message}`
    );
  }
}

/**
 * Checks if the text area to fill isn't empty.
 * @throws when the text area is empty and and there was an attempt to submit
 */
function assertTextFilled() {
  if (textArea.validity.valueMissing) {
    renderError("you must enter some kinda text, man");
    throw "not filled";
  }
}

/**
 * Checks if response was ok. This is necessary since 'response' can't be reached from 'catch', and it contains fatal information.
 * @param {Object} response - the response object recieved from an HTTP request.
 */
function assertResponseOk(response) {
  if (!response.ok) {
    console.log(response.status);
    showErrorCat(response.status);
    hideElements([loadingText], [true]);
  }
}

/**
 * Recieves two arrays, one with elements, the second with 'true/false' states. They are matched by index.
 *
 * @param {Array} elements  - the array of elements for whom to change state
 * @param {Array} states - the array of true/false states, ordered by their matching elements
 */
function hideElements(elements, states) {
  elements.forEach(function (element, index) {
    element.hidden = states[index];
  });
}

/**
 * Displays a funny image depicting the type of error recieved from a HTTP request
 * @param {number} code - the number of the response code
 */
function showErrorCat(code) {
  hideElements([errorImage], [false]);
  errorImage.src = `https://http.cat/${code}`;
}

/**
 * Cleans up any errors and results left from previous queries.
 */
function cleanPrevious() {
  errorText.textContent = "";
  polarityText.textContent = "";
  chargeText.textContent = "";
}
