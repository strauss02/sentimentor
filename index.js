/************************ Constants ************************/

const request = "https://sentim-api.herokuapp.com/api/v1/";
const text = `We have been through much darker times than these, and somehow each generation of Americans carried us through to the other side," he said. "Not by sitting around and waiting for something to happen, not by leaving it to others to do something, but by leading that movement for change themselves. And if you do that, if you get involved, and you get engaged, and you knock on some doors, and you talk with your friends, and you argue with your family members, and you change some minds, and you vote, something powerful happens.`;

/************************ Select Elements ************************/
const submitButton = document.querySelector("button");
const textArea = document.querySelector("#input-text");
let inputText = textArea.value;

submitButton.addEventListener("click", handleSubmit);

function handleSubmit() {
  inputText = textArea.value;
  getResponse(inputText);
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

  console.log(response);
  console.log(data);
}
