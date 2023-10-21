const backgroundImage = document.getElementById("background-image"); // Select the background image
const moveButtons = document.querySelectorAll("button"); // Select all buttons with the "move" class
const container = document.getElementById("mainson-container"); // Select the container with the mainson image
const DEBUT = false;

// window.onload = function () {
//   backgroundImage.style.bottom = "-100px";
// };

// Debug actions of button (show/hide buttons)
if (DEBUT) {
  document.onmousemove = function (e) {
    var x = e.pageX;
    var y = e.pageY;
    e.target.title = "X is " + x + " and Y is " + y;
  };
}
const buttonDebug = document.getElementById("button-debug");
buttonDebug.addEventListener("click", function () {
  const buttons = document.querySelectorAll(".interactive");
  buttons.forEach((button) => {
    button.classList.toggle("show");
  });
});

// Select all buttons with the "interactive" class
const interactiveButtons = document.querySelectorAll(".interactive");
// Add a click event to each button
interactiveButtons.forEach((button) => {
  button.addEventListener("click", function () {
    alert(`Button ID: ${this.id}`);
  });
});

// Update the position of the buttons when the background image moves
// This function is called in mobile mode
function updateButtonsPos(top, left) {
  const buttons = document.querySelectorAll(".interactive");
  buttons.forEach((button) => {
    button.style.top = button.offsetTop + top + "px";
    button.style.left = button.offsetLeft + left + "px";
  });
}

// Add a click event to each button to move the background image
moveButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const direction = event.target.id.replace("move-", "");
    moveBackground(direction);
  });
});

// Move the background image in the specified direction
function moveBackground(direction) {
  let top = backgroundImage.offsetTop;
  let left = backgroundImage.offsetLeft;

  const step = 20; // Adjust this to change the speed of the movement
  //const containerWidth = container.clientWidth;
  //const containerHeight = container.clientHeight;
  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight;
  const imageWidth = backgroundImage.width;
  const imageHeight = backgroundImage.height;

  switch (direction) {
    case "up":
      top = Math.min(top + step, 0);
      break;
    case "down":
      top = Math.max(
        top - step,
        containerHeight + containerHeight / 5 - imageHeight
      );
      break;
    case "left":
      left = Math.min(left + step, 0);
      break;
    case "right":
      left = Math.max(
        left - step,
        containerWidth + containerWidth / 4 - imageWidth
      );
      break;
  }

  console.log(direction, top, left);
  console.log(
    containerHeight,
    imageHeight,
    top - step,
    containerHeight - imageHeight
  );
  // Update the position of the buttons interactives to follow the background image
  updateButtonsPos(
    top - backgroundImage.offsetTop,
    left - backgroundImage.offsetLeft
  );
  //backgroundImage.style.top = top + "px";
  //backgroundImage.style.left = left + "px";
  backgroundImage.style.marginTop = top + "px";
  backgroundImage.style.marginLeft = left + "px";
}
