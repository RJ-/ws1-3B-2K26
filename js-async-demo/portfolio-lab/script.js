// =========================================================
// WS1 Portfolio · script.js
// Week 8 parts are DONE (keep them working).
// Week 11 lab parts are DONE too.
// Week 12 lab: fill in Tasks 1–3 below.
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
// WEEK 11 LAB (done)
// Task 1 (the projects array) has MOVED to data/projects.json.
// It is now loaded in Week 12 Task 2 below.
// =========================================================

// ---------- Week 11 Task 2 · Filter buttons (projects.html) ----------
const filterButtons = document.querySelectorAll("#filters button");

filterButtons.forEach((filterBtn) => {
  filterBtn.addEventListener("click", () => {
    const filter = filterBtn.getAttribute("data-filter");

    document.querySelectorAll(".project").forEach((card) => {
      if (filter === "all" || card.classList.contains(filter)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// ---------- Week 11 Task 3 · Photo swap (about.html) ----------
const photo = document.getElementById("profile-photo");

if (photo) {
  photo.addEventListener("click", () => {
    if (photo.getAttribute("src") === "images/me.svg") {
      photo.setAttribute("src", "images/me-alt.svg");
      photo.setAttribute("alt", "Illustration of Juan waving");
    } else {
      photo.setAttribute("src", "images/me.svg");
      photo.setAttribute("alt", "Illustration of Juan smiling");
    }
  });
}

// ---------- Week 11 Task 4 · Surprise accent color (all pages) ----------
const accentBtn = document.getElementById("accentBtn");
const accentValue = document.getElementById("accentValue");

if (accentBtn) {
  accentBtn.addEventListener("click", () => {
    const color =
      "#" + Math.random().toString(16).slice(2, 8).padEnd(6, "0").toUpperCase();
    document.querySelector(".site-header").style.backgroundColor = color;
    accentValue.textContent = color;
  });
}

// =========================================================
// WEEK 12 LAB · Asynchronous JavaScript
// =========================================================

// ---------- Task 1 · A reusable loadJSON(url) helper ----------
// TODO: async function loadJSON(url)
//   - await fetch(url)
//   - if (!response.ok) throw new Error(...)
//   - return await response.json()


// ---------- Task 2 · Project cards from data/projects.json (projects.html) ----------
// TODO: async function showProjects()
//   - show "Loading projects…" in #project-status
//   - const projects = await loadJSON("data/projects.json")
//   - build one <article class="project CATEGORY"> per project (same as Week 11)
//   - on error: show a friendly message with class "status error"
//   - only run it if #project-list exists on this page


// ---------- Task 3 · Featured project (index.html) ----------
// TODO: async function showFeatured()
//   - reuse loadJSON("data/projects.json")
//   - find the project with featured === true (hint: .find())
//   - show its title and description inside #featured
//   - only run it if #featured exists on this page
