const request = "https://sentim-api.herokuapp.com/api/v1/";
const text = `We have been through much darker times than these, and somehow each generation of Americans carried us through to the other side," he said. "Not by sitting around and waiting for something to happen, not by leaving it to others to do something, but by leading that movement for change themselves. And if you do that, if you get involved, and you get engaged, and you knock on some doors, and you talk with your friends, and you argue with your family members, and you change some minds, and you vote, something powerful happens.`;

async function getResponse() {
  const response = await fetch(request, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  console.log(response);

  const data = await response.json();
  console.log(data);
}

getResponse();
