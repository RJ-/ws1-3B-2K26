// =========================================================
// WS1 Portfolio · script.js
// Week 8 parts are DONE (keep them working).
// Week 11 lab: fill in Tasks 1–4 below.
// =========================================================
console.log("script.js loaded");

// ---------- Week 8 · Time-based greeting (index.html) ----------
function showGreeting() {
  const hour = new Date().getHours(); // 0–23
  let message;
  if (hour < 12) {
    message = "Good morning! Welcome to my portfolio.";
  } else if (hour < 18) {
    message = "Good afternoon! Welcome to my portfolio.";
  } else {
    message = "Good evening! Welcome to my portfolio.";
  }
  const el = document.getElementById("greeting");
  if (el) {
    el.textContent = message;
  }
}
showGreeting();

// ---------- Week 8 · Skills list from an array (about.html) ----------
const skills = ["HTML", "CSS", "JavaScript", "Git", "Canva"];
const list = document.getElementById("skills");
if (list) {
  for (let i = 0; i < skills.length; i++) {
    list.innerHTML += "<li>" + skills[i] + "</li>";
  }
}

// ---------- Week 8 · Dark-mode button (all pages) ----------
const btn = document.getElementById("themeBtn");
if (btn) {
  btn.addEventListener("click", function () {
    document.body.classList.toggle("dark");
  });
}

// =========================================================
// WEEK 11 LAB
// =========================================================

// ---------- Task 1 · Project cards from an array (projects.html) ----------
// TODO: make an array of 3+ project objects { title, description, category }
// TODO: for each project, createElement("article"), add classes "project" and
//       its category, add an <h3> and a <p>, then appendChild to #project-list
//       (wrap it in if (projectList) { ... })


// ---------- Task 2 · Filter buttons (projects.html) ----------
// TODO: querySelectorAll("#filters button"), and on each click read
//       data-filter with getAttribute, then show/hide every .project


// ---------- Task 3 · Photo swap (about.html) ----------
// TODO: on click of #profile-photo, swap src AND alt between
//       images/me.svg and images/me-alt.svg (use addEventListener)


// ---------- Task 4 · Surprise accent color (all pages) ----------
// TODO: on click of #accentBtn, make a random hex color (don't forget "#"),
//       set it as the header's backgroundColor, and show it in #accentValue
