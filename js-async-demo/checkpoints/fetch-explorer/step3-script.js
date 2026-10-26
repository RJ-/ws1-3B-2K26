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

// STEP B1 — fetch() returns a Promise ================================
const request = fetch(EVENTS_URL);
console.log(request); // Promise {<pending>}

request
  .then((response) => {
    console.log(response); // Response {status: 200, ok: true, ...}
    return response.json(); // reading the body ALSO returns a Promise
  })
  .then((data) => {
    console.log(data); // (5) [{…}, {…}, …]: a normal JavaScript array!
    console.log(data[0].title);
  });

// STEP B2 — Turn the data into cards (Week 11 DOM skills) =============
function renderEvents(events) {
  eventsBox.innerHTML = ""; // clear old cards first
  events.forEach((event) => {
    const card = document.createElement("article");
    card.className = "event";

    const title = document.createElement("h3");
    title.textContent = event.title;

    const when = document.createElement("p");
    when.textContent = "📅 " + niceDate(event.date);

    const where = document.createElement("p");
    where.textContent = "📍 " + event.venue;

    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = event.category;

    card.append(title, when, where, tag);
    eventsBox.appendChild(card);
  });
}

// STEP B3 — Loading and error messages ================================
// (this replaces the B2 click handler)
loadBtn.addEventListener("click", () => {
  statusText.className = "";
  statusText.textContent = "Loading events…";
  eventsBox.innerHTML = "";

  fetch(EVENTS_URL)
    .then((response) => {
      // fetch only rejects when there is NO response at all (offline, CORS).
      // A 404 or 500 is still a "response", so WE must check it.
      if (!response.ok) {
        throw new Error(`Could not load ${EVENTS_URL} (HTTP ${response.status})`);
      }
      return response.json();
    })
    .then((events) => {
      renderEvents(events);
      statusText.textContent = `${events.length} events loaded.`;
    })
    .catch((error) => {
      statusText.className = "error";
      statusText.textContent = "⚠ " + error.message;
    });
});

// STEP B4 — The same thing with async / await
// TODO: async function loadEvents() with try / catch / finally

// STEP B5 — Ask a real web API
// TODO: on form submit, fetch https://pokeapi.co/api/v2/pokemon/<name> and show the result
