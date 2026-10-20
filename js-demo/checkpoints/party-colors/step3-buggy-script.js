// The original code-along version. It runs with no errors... but does the
// background change? Open the Console and look at the color it prints.
// What is missing compared with a CSS color like #A1B2C3?
const button = document.querySelector("button");
const background = document.querySelector("body");
const colorValue = document.querySelector("h2");

button.addEventListener("click", () => {
  let color = "";
  console.log((color += Math.random().toString(16).slice(2, 8).toUpperCase()));

  background.style.backgroundColor = color;
  colorValue.innerText = color;
});
