// jshint esversion: 6

// Hangman minigame code
import { runHangmanGame } from "./minigames/hangman.js";
import { showDialogueAsync } from "./dialogue.js";

// Memory minigame code
import { flipCard } from "./minigames/memory-game.js";

// Mansion interaction code
const backgroundImage = document.getElementById("background-image"); // Select the background image
const moveButtons = document.querySelectorAll("button"); // Select all buttons with the "move" class
const container = document.getElementById("mansion-container"); // Select the container with the mansion image
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
    displayMiniGames(this.id);
    // alert(`Button ID: ${this.id}`);
  });
});

let inColliding; // Variable to check if the background image is colliding with a button
document.addEventListener("keydown", function (event) {
  const image = document.getElementById("guide");
  const container = document.getElementById("container");
  const buttons = document.querySelectorAll(".interactive");
  const speed = 10; // Movement speed (you can adjust this)

  image.style.display = "block";

  let left = parseInt(getComputedStyle(image).left);
  let top = parseInt(getComputedStyle(image).top);

  switch (event.key) {
    case "ArrowUp":
      top -= speed;
      break;
    case "ArrowDown":
      top += speed;
      break;
    case "ArrowLeft":
      left -= speed;
      break;
    case "ArrowRight":
      left += speed;
      break;
    default:
      return; // Do nothing if it's not an arrow key
  }

  // const containerWidth = window.innerWidth;
  // const containerHeight = window.innerHeight;
  const containerWidth = backgroundImage.width;
  const containerHeight = backgroundImage.height;
  // Limit the movement so the image doesn't go out of the container
  left = Math.max(0, Math.min(containerWidth - image.width, left));
  top = Math.max(0, Math.min(containerHeight - image.height, top));

  // Update the image's position
  image.style.left = left + "px";
  image.style.top = top + "px";

  //console.log("inColliding: ", inColliding);
  // Check for collision or being within the area of a button
  let newColliding = false;
  let buttonColliding;
  buttons.forEach((button) => {
    if (isColliding(image, button)) {
      newColliding = true;
      buttonColliding = button;
      //   inColliding = true;
      //   button.click();
    }
  });
  if (newColliding && !inColliding) {
    inColliding = true;
    buttonColliding.click();
  } else if (!newColliding) {
    inColliding = false;
  }
});

// Function to check for collision or being within the area of two elements
function isColliding(element1, element2) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

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

// Hangman minigame code

// import { runHangmanGame } from "./minigames/hangman.js";
// import { showDialogueAsync } from "./dialogue.js";

const gameContainer = document.getElementById("game-container");
// gameContainer.showModal();
// runHangmanGame();

const introDialogue = [
  {
    text: "Hello?",
    choices: [
      {
        text: "Are you a ghost?",
        action: () => ({
          newDialogue: { text: "I think... I am" },
        }),
      },
      {
        text: "Are you okay?",
        action: () => ({
          newDialogue: { text: "I think... I am a ghost" },
        }),
      },
    ],
  },
  {
    text: "Okay...",
    choices: [
      {
        text: "Are you a friendly ghost?",
        action: () => ({
          newDialogue: { text: "I am, but there are others here..." },
        }),
      },
      {
        text: "Should I run away screaming?",
        action: () => ({
          newDialogue: { text: "Not from me" },
        }),
      },
    ],
  },
  {
    text: "It's very cold outside.",
    choices: [
      {
        text: "Can I stay a while?",
        action: () => ({
          newDialogue: {
            text: "That depends, will you help me with something?",
          },
        }),
      },
      {
        text: "Is it safe for me here?",
        action: () => ({
          newDialogue: {
            text: "I can keep you safe, if you help me with something.",
          },
        }),
      },
    ],
  },
  { text: "Please..." },
  {
    text: "What do you need help with?",
    choices: [
      {
        text: "I scare easily",
        action: () => ({
          newDialogue: {
            text: "You’ll be fine",
          },
        }),
      },
      {
        text: "I can help you",
        action: () => ({
          newDialogue: {
            text: "Thank you",
          },
        }),
      },
    ],
  },
  { text: "Please..." },
  {
    text: "I have been trapped in this house for centuries.. able only to be seen by the human realm on Halloween...",
  },
  {
    text: "I do not know why I am trapped, but I am sure that if I knew why I died then I would be able to move on...",
  },
  {
    text: "There are many clues hidden in this house – are you bold enough to find them?",
  },
];

document.addEventListener("DOMContentLoaded", async () => {
  const ghost = document.querySelector(".ghost-image");
  ghost.classList.add("active");
  await showDialogueAsync(introDialogue);
  ghost.classList.remove("active");
});

// -------- Mini games functions ---------

// This function displays the first mini game
const miniGame1 = () => {
  gameContainer.showModal();
  runHangmanGame();
};
// (window.location.href = "game1.html");

// This function displays the second mini game
const miniGame2 = () => {
  alert("waiting for Jorgen to init the game in the 2nd door...");
  // flipCard();
};

// This function displays the third mini game
const miniGame3 = () =>
  alert("waiting for Sam to init the game in the 3th door...");

/*This function finds the id of the clicked button
 * passed from the event listener
 * and calls the respective function
 * to displays the clicked mini game
 */
const displayMiniGames = (id) => {
  if (id == "door1") {
    miniGame1();
  } else if (id == "door2") {
    miniGame2();
  } else if (id == "door3") {
    // miniGame3();
  } else if (id == "door4") {
    miniGame3();
  }
};
