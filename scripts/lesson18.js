const url = "https://supersimplebackend.dev/greeting";

const xhr = new XMLHttpRequest();
xhr.addEventListener("load", () => {
  xhr.response;
  // console.log(xhr.response);
});
xhr.open("GET", url);
xhr.send();

// fetch(url)
//   .then((response) => response.text())
//   .then((json) => console.log(json));

async function getData() {
  const response = await fetch(url);
  const message = await response.text();
  console.log(message);
}
// getData();

fetch(url, {
  method: "POST",
  headers: { "content-Type": "application/json" },
  body: JSON.stringify({ name: "jay" }),
})
  .then((response) => response.text())
  .then((message) => console.log(message))
  .catch((error) => {
    console.log("CORS error. Your request was blocked by the backend.");

    throw new Error("CORS error. Your request was blocked by the backend.");
  });
//
//
// async POST
async function postData() {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ name: "Azoroh" }),
    });

    const message = await response.text();
    console.log(message);
  } catch (error) {
    console.log("CORS error. Your request was blocked by the backend.");

    throw new Error("CORS error. Your request was blocked by the backend.");
  }
}
// postData();

// fetch(url, {
//   method: "POST",
//   headers: { "content-Type": "application/json" },
// })
//   .then((res) => {
//     if (res.status >= 400) {
//       throw res;
//     }
//   })
//   .catch((error) => {
//     if (error.status === 400) {
//       error.json();
//     }
//   });

async function tryError() {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-Type": "application/json" },
    });

    if (res.status >= 400) {
      throw res;
    }

    const message = await res.text();
    console.log(message);
  } catch (error) {
    if (error.status === 400) {
      const errMessage = await error.json();
      console.log(errMessage);
    } else {
      console.log("Network error. please try again later");
    }
  }
}

// tryError();
