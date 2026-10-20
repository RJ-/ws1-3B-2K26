/*
"When you throw yourself out there great things happen.
Just take this course blindly and dive into the world of programming starting from scratch."
—Prajwal A.
*/

// Open the browser Console (right-click → Inspect → Console) before you start.

// STEP 1 — Find an element and change it ===============================
console.log(document.getElementById("title")); // the whole <h1> element

document.getElementById("title").innerHTML = "New Title"; // watch the page change

const title = document.getElementById("title"); // save it in a variable
title.innerHTML = "Bucket List"; // change it back

// textContent sets plain text only (safer when the text comes from a user)
const description = document.getElementById("description");
description.textContent = "List of things I would want to do.";
