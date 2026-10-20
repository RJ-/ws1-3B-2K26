/*
"When you throw yourself out there great things happen.
Just take this course blindly and dive into the world of programming starting from scratch."
—Prajwal A.
*/



// Open the browser Console (right-click → Inspect → Console) before you start.

// STEP 1 — Find an element and change it
// TODO: getElementById("title"), console.log it, then change its text
const title = document.getElementById("title");
console.log(title.textContent = "Wish List")

// STEP 2 — Create new elements and add them to the page
// TODO: createElement("li"), set its text, appendChild to #parent
const newElem = document.createElement("li");
newElem.textContent = "Thesis Defended";
const list = document.getElementById("parent")
list.appendChild(newElem)

// TODO: loop over an array and add one <li> per item
const items = document.querySelectorAll("#parent li");

// for (let item = 0; item => items.length; item++){
//     console.log(items[item].textContent)
// }

// items.forEach(function (item) {
//     console.log(item.textContent)
// });

// STEP 3 — Remove an element
// TODO: remove #bl-1 from the list


// STEP 4 — Read and change attributes
// TODO: getAttribute("src") on the image, then write updateAttribute()
const img = document.querySelector("img")
console.log(img.getAttribute("src"))

function updateAttribute(){
    if(img.getAttribute("src") === "images/bucket-list.svg"){
        img.setAttribute("src", "images/bucket-list-done.svg");
    }else{
        img.setAttribute("src", "images/bucket-list.svg");
    }
}


// STEP 5 — Select many elements at once
// TODO: getElementsByTagName, getElementsByClassName, querySelector, querySelectorAll


// STEP 6 — Make it react: style and classList
// TODO: click a list item to toggle the .done class
