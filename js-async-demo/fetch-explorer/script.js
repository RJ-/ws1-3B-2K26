/*
"Any fool can write code that a computer can understand.
Good programmers write code that humans can understand."
—Martin Fowler
*/

// Open the Console AND the Network tab (F12) before you start.

// ---------- Given: page elements and helpers (no need to change) ----------
const loadBtn = document.getElementById("loadBtn");
const statusText = document.getElementById("status");
const eventsBox = document.getElementById("events");
const pokeForm = document.getElementById("pokeForm");
const pokeName = document.getElementById("pokeName");
const pokeResult = document.getElementById("pokeResult");

const EVENTS_URL = "data/events.json";

// A Promise that resolves after ms milliseconds (you built these in Part A!)
// Use it to fake a slow network so you can SEE the loading message.
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Turns "2026-11-09" into "Mon, Nov 9, 2026"
function niceDate(isoDate) {
  return new Date(isoDate + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// STEP B1 — fetch() returns a Promise
// TODO: fetch(EVENTS_URL), console.log it, then .then(res => res.json()).then(data => ...)

// STEP B2 — Turn the data into cards
// TODO: renderEvents(events) builds one <article class="event"> per event; call it on loadBtn click

// STEP B3 — Loading and error messages
// TODO: show "Loading events…", check response.ok, .catch() the error into #status

// STEP B4 — The same thing with async / await
// TODO: async function loadEvents() with try / catch / finally

// STEP B5 — Ask a real web API
// TODO: on form submit, fetch https://pokeapi.co/api/v2/pokemon/<name> and show the result
