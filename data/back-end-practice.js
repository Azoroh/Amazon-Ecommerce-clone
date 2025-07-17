const xhr = new XMLHttpRequest();

xhr.addEventListener("load", () => {
  let result = xhr.response;
  // const obj = JSON.parse(result)
  console.log(result);
});

xhr.open("GET", "https://supersimplebackend.dev");
// xhr.open('POST', {name: 'jay'})
xhr.send();
