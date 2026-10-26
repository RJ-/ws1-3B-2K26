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

// STEP A2 — Callback hell: three steps, one inside the other ===========
// "Error-first" callback: done(error, result). If error is not null, stop.
function takeOrderCb(drink, done) {
  logStep(`Taking order: ${drink}`);
  setTimeout(() => {
    if (SOLD_OUT.includes(drink)) {
      done(`Sorry, ${drink} is sold out`, null);
    } else {
      done(null, drink);
    }
  }, 1000);
}

function serveCb(cup, done) {
  setTimeout(() => {
    logStep(`Served: ${cup}`, "success");
    done();
  }, 1000);
}

callbackBtn.addEventListener("click", () => {
  clearLog();
  setBusy(true);
  takeOrderCb(drinkSelect.value, (error, drink) => {
    if (error) {
      logStep(error, "error");
      setBusy(false);
      return;
    }
    brewWithCallback(drink, (cup) => {
      serveCb(cup, () => {
        logStep("Order complete!", "success");
        setBusy(false);
      }); // ← see the pyramid
    }); //    growing to the
  }); //      right? That's "callback hell".
});

// STEP A3 — Make a Promise ============================================
// A Promise is an object for a value that is not ready YET.
// It starts "pending", then becomes "fulfilled" (resolve) or "rejected" (reject).
function takeOrder(drink) {
  return new Promise((resolve, reject) => {
    logStep(`Taking order: ${drink}`);
    setTimeout(() => {
      if (SOLD_OUT.includes(drink)) {
        reject(new Error(`Sorry, ${drink} is sold out`));
      } else {
        resolve(drink);
      }
    }, 1000);
  });
}

function brew(drink) {
  return new Promise((resolve) => {
    logStep(`Brewing ${drink}…`);
    setTimeout(() => resolve(`${drink} ☕`), 2000);
  });
}

function serve(cup) {
  return new Promise((resolve) => {
    setTimeout(() => {
      logStep(`Served: ${cup}`, "success");
      resolve(cup);
    }, 1000);
  });
}

// Try these in the Console:
// const p = takeOrder("Pili Latte"); p          → Promise {<pending>}
// ...wait 1 s, then type p again                → Promise {<fulfilled>: 'Pili Latte'}
// takeOrder("Ube Latte")                        → Uncaught (in promise) Error

// STEP A4 — .then() / .catch() / .finally() ==========================
thenBtn.addEventListener("click", () => {
  clearLog();
  setBusy(true);

  takeOrder(drinkSelect.value)
    .then((drink) => brew(drink)) // return the next Promise...
    .then((cup) => serve(cup)) // ...so the chain waits for it
    .then(() => logStep("Order complete!", "success"))
    .catch((error) => logStep(error.message, "error")) // ANY step that fails lands here
    .finally(() => setBusy(false)); // runs on success AND on failure
});
// Flat, top to bottom: no pyramid. One .catch() handles every step.

// STEP A5 — async / await: the same chain, written like normal code
// TODO: async function placeOrder(drink) with try / catch / finally

// STEP A6 — Promise.all: brew three drinks at the same time
// TODO: rushBtn click → time one-at-a-time vs. Promise.all
