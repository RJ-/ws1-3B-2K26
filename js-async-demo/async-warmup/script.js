/*
"Programs must be written for people to read, and only incidentally for machines to execute."
—Harold Abelson
*/

// Open the Console (F12 → Console) before you start.

// The elements are already selected for you (that was Week 11!)
const orderLog = document.getElementById("order-log");
const runOrder = document.getElementById("runOrder");
const counterBtn = document.getElementById("counterBtn");
const freezeBtn = document.getElementById("freezeBtn");
const waitBtn = document.getElementById("waitBtn");
const statusText = document.getElementById("status");
const clock = document.getElementById("clock");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

// Helper: writes a message to the Console AND to the list on the page
function show(message) {
  console.log(message);
  const li = document.createElement("li");
  li.textContent = message;
  orderLog.appendChild(li);
}

// PART 1 — Predict the order
// TODO: on click, show "1", then setTimeout(..., 0) to show "2", then show "3"
runOrder.addEventListener("click", function () {
  show("Order Taken");
  setTimeout(()=> {
    show("Coffee Ready")
  }, 10000)
  show("Next Customer")
})

// PART 2 — Freeze vs. wait
// TODO: a counter button, a "freeze" with a while loop, a "wait" with setTimeout
let counter = 0;
counterBtn.addEventListener("click", () => {
  counter ++;
  counterBtn.innerHTML = "Click me (" + counter + ")"
})

freezeBtn.addEventListener("click", () =>  {
  const end = Date.now() + 3000;

  // console.log(Date.now(), end)
  while(Date.now() < end ){
    // do nothing for 3 secs
    console.log(Date.now())
  }
})

waitBtn.addEventListener("click", () => {
  statusText.textContent = "Waiting for 3s."
  setTimeout(function(){
    statusText.textContent = "Done Waiting 3s."
  },3000)
})



// PART 3 — A clock with setInterval
// TODO: start a clock with setInterval, stop it with clearInterval
