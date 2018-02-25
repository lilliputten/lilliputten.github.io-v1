// Testing url load with require
let data = null;
let url = '/site/a.md';
// let url = '/server/site/a.md';
// let url = 'https://lilliputten.github.io/images/Docs/pdf.gif';
let getPromise = axios.get(url);
getPromise
  .then(function (response) {
    data = response.data;
    console.log('Loaded file:', response.data);
  })
  .catch(function (err) {
    console.error(err);
    debugger;
  })
;
