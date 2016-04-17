import DB from './db.js';

// document.querySelector('.submit-button').addEventListener('click', (e) => {
//   let content = document.querySelector(".textarea").value;
//   let deadline = document.querySelector(".text-input").value;
//   let db = new DB();
//   db.createWork(content, new Date(deadline))
//   .then(() => {
//     location.href = "home.html";
//   });
// });
function submit(content, deadline) {
  let db = new DB();
  db.createWork(content, new Date(deadline))
  .then(() => {
    location.href = "home.html";
  });
}
