/*
"First, solve the problem. Then, write the code."
—John Johnson
*/

// Open the Console (F12 → Console) before you start.

// ---------- Given: page elements and helpers (no need to change) ----------
const drinkSelect = document.getElementById("drink");
const callbackBtn = document.getElementById("callbackBtn");
const thenBtn = document.getElementById("thenBtn");
const asyncBtn = document.getElementById("asyncBtn");
const rushBtn = document.getElementById("rushBtn");
const spinner = document.getElementById("spinner");
const log = document.getElementById("log");

const SOLD_OUT = ["Ube Latte"];

// Adds one line to the Order log. type: "info", "success", "error" or "time"
function logStep(message, type = "info") {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${message}`);
  const li = document.createElement("li");
  li.className = type;
  li.textContent = `[${time}] ${message}`;
  log.appendChild(li);
}

function clearLog() {
  log.innerHTML = "";
}

// Shows the spinner and disables the buttons while the barista is busy
function setBusy(isBusy) {
  spinner.classList.toggle("show", isBusy);
  document.querySelectorAll("button").forEach((b) => (b.disabled = isBusy));
}

// STEP A1 — Callbacks: "call me back when you're done" =================
// A callback is a function we pass in, to be called LATER.
function brewWithCallback(drink, done) {
  logStep(`Brewing ${drink}…`);
  setTimeout(() => {
    done(`${drink} ☕`); // 2 s later: call the function we were given
  }, 2000);
}

// Try it in the Console first:
// brewWithCallback("Kapeng Barako", (cup) => logStep(`Ready: ${cup}`, "success"));

// STEP A2 — Callback hell: three steps, one inside the other
// TODO: takeOrderCb, serveCb, then nest all three inside the callbackBtn click

// STEP A3 — Make a Promise
// TODO: takeOrder(drink), brew(drink), serve(cup) that each RETURN a new Promise

// STEP A4 — Chain with .then(), catch errors with .catch(), clean up with .finally()
// TODO: thenBtn click → takeOrder → brew → serve

// STEP A5 — async / await: the same chain, written like normal code
// TODO: async function placeOrder(drink) with try / catch / finally

// STEP A6 — Promise.all: brew three drinks at the same time
// TODO: rushBtn click → time one-at-a-time vs. Promise.all
