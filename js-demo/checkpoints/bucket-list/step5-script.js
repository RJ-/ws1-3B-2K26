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

// STEP 2 — Create new elements and add them to the page ================
// createElement makes the element in memory; it is NOT on the page yet
const newList = document.createElement("li");
newList.innerHTML = "Skydiving";

// appendChild puts it inside a parent that is already on the page
const myList = document.getElementById("parent");
myList.appendChild(newList);

// Same steps inside a loop: one <li> for every item in the array
const newBucketList = ["Join a band", "Run a marathon", "Read a book"];

for (let list of newBucketList) {
  const item = document.createElement("li");
  item.innerHTML = list;
  myList.appendChild(item);
}

// STEP 3 — Remove an element ===========================================
const deleteList = document.getElementById("bl-1");
// removeChild is called on the PARENT and returns the removed element
console.log("Removed:", myList.removeChild(deleteList).innerHTML);
// Newer, shorter way: someElement.remove();

// STEP 4 — Read and change attributes ==================================
const img = document.querySelector("img");
console.log(img.getAttribute("src")); // images/bucket-list.svg

// 4a: called by onclick="updateAttribute()" in the HTML
// 4b: we swap back and forth instead of changing only once
function updateAttribute() {
  if (img.getAttribute("src") === "images/bucket-list.svg") {
    img.setAttribute("src", "images/bucket-list-done.svg");
    img.setAttribute("alt", "Bucket List: goals achieved");
  } else {
    img.setAttribute("src", "images/bucket-list.svg");
    img.setAttribute("alt", "Bucket List Image");
  }
}

// STEP 5 — Select many elements at once ================================
// getElementsByTagName → HTMLCollection (live list)
const lists = document.getElementsByTagName("li");
for (const item of lists) {
  console.log(item.innerHTML);
}
console.log(lists[0].innerHTML); // first item

// getElementsByClassName → HTMLCollection
const learn = document.getElementsByClassName("learn");
console.log(learn.length);

// querySelector → the FIRST match only (uses CSS selectors)
const paragraph = document.querySelector("p");
console.log(paragraph);

// querySelectorAll → NodeList of every match; it has forEach
const learnClass = document.querySelectorAll(".learn");
learnClass.forEach((element) => {
  console.log(element.innerHTML);
});
console.log(learnClass.length);

// Any CSS selector works:
console.log(document.querySelectorAll("li, .learn").length); // li OR .learn
const urgentClass = document.querySelectorAll(".urgent.learn"); // both classes
console.log(urgentClass.length); // 0 now, because Step 3 removed #bl-1!
