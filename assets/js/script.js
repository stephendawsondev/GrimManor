// jshint esversion: 6

// Minigames code
import { runHangmanGame } from "./minigames/hangman.js";
import { startMemoryGame } from "./minigames/memory-game.js";
import { handlePlay } from "./minigames/quiz.js";
import { initLastQuizGame } from "./minigames/lastquiz.js";
import { showDialogueAsync } from "./dialogue.js";
import { savePlayerData, loadPlayerData } from "./gamedata-localstore.js";
// import { savePlayerData, loadPlayerData } from "./gamedata-localstore.js";
// let loadedPlayerData = loadPlayerData();

// const landingEnter = document?.getElementById("landing-enter");
// landingEnter?.addEventListener("click", (e) => {
//   e.preventDefault();

//   savePlayerData({ ...loadedPlayerData, firstTimePlaying: false });
//   // window.location.href = "index.html";
// });

// if (loadedPlayerData.firstTimePlaying) {
//   window.location.href = "landing.html";
// }

// Get the current pathname
const currentPath = window.location.pathname;

let userAllowsSounds, userAllowsMusic;

const loadPlayerSettings = () => {
  const loadedData = loadPlayerData();
  if (loadedData) {
    userAllowsSounds = loadedData.playerAllowsSound;
    userAllowsMusic = loadedData.playerAllowsMusic;
  }
};

if (currentPath.includes("landing.html")) {
  userAllowsSounds = false;
  userAllowsMusic = false;
} else {
  loadPlayerSettings();
}

// Audio code
const classicScareAudio = new Audio("../../assets/audio/classic-scare.mp3");
const evilLaughAudio = new Audio("../../assets/audio/evil-laugh.mp3");
const ghostScreamAudio = new Audio("../../assets/audio/ghost-scream.mp3");
const highPitchedScreamAudio = new Audio(
  "../../assets/audio/high-pitched-scream.mp3"
);
const spookyGhostWindAudio = new Audio(
  "../../assets/audio/spooky-ghost-wind.mp3"
);
const stairsAudio = new Audio("../../assets/audio/stairs.mp3");
const thunderstormAudio = new Audio("../../assets/audio/thunderstorm.mp3");
const windAndDreadAudio = new Audio("../../assets/audio/wind-and-dread.mp3");
const darkAmbientMusicAudio = new Audio(
  "../../assets/audio/dark-ambient-music.mp3"
);

const doorOpenAudio = new Audio("../../assets/audio/door-creak-open.mp3");
const doorShutAudio = new Audio("../../assets/audio/door-shut.mp3");
const creepyWhistlyMusicAudio = new Audio(
  "../../assets/audio/creepy-whistly-music.mp3"
);
// Mansion interaction code
const backgroundImage = document.getElementById("background-image"); // Select the background image
const moveButtons = document.querySelectorAll("button"); // Select all buttons with the "move" class
const container = document.getElementById("mansion-container"); // Select the container with the mansion image
const DEBUT = false;

// Debug actions of button (show/hide buttons)
if (DEBUT) {
  document.onmousemove = function (e) {
    var x = e.pageX;
    var y = e.pageY;
    e.target.title = "X is " + x + " and Y is " + y;
  };
}
const buttonDebug = document?.getElementById("button-debug");
if (buttonDebug) {
  buttonDebug.addEventListener("click", function () {
    const buttons = document.querySelectorAll(".interactive");
    buttons.forEach((button) => {
      button.classList.toggle("show");
    });
  });
}

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
    let loadedPlayerData = loadPlayerData();
    if (buttonColliding.id == "door2") {
      if (
        loadedPlayerData.hangmanClueObtained &&
        loadedPlayerData.memoryClubObtained &&
        loadedPlayerData.quizClueObtained
      ) {
        buttonColliding.click();
      }
    } else {
      if (
        buttonColliding.id == "door1" &&
        !loadedPlayerData.hangmanClueObtained
      ) {
        buttonColliding.click();
      } else if (
        buttonColliding.id == "door3" &&
        !loadedPlayerData.memoryClubObtained
      ) {
        buttonColliding.click();
      } else if (
        buttonColliding.id == "door4" &&
        !loadedPlayerData.quizClueObtained
      ) {
        buttonColliding.click();
      }
    }
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

  // console.log(direction, top, left);
  // console.log(
  //   containerHeight,
  //   imageHeight,
  //   top - step,
  //   containerHeight - imageHeight
  // );
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

// Check if the webpage is being refreshed or reset
window.addEventListener("beforeunload", function (event) {
  // event.preventDefault();
  event.returnValue = "";
  // const confirmation = window.confirm("Do you want to restart the game?");
  // if (confirmation) {
  localStorage.clear();
  loadedPlayerData = loadPlayerData();
  savePlayerData({
    ...loadedPlayerData,
    landingPageComplete: false,
  });
  // }
});

// function handleBeforeUnload(event) {
//   event.preventDefault();
//   localStorage.clear();
//   window.removeEventListener("beforeunload", handleBeforeUnload);
// }
// window.addEventListener("beforeunload", handleBeforeUnload);

// Show the landing page
let loadedPlayerData = loadPlayerData();
if (!loadedPlayerData.landingPageComplete) {
  loadedPlayerData = loadPlayerData();
  savePlayerData({
    ...loadedPlayerData,
    landingPageComplete: true,
  });

  // alert(loadedPlayerData.landingPageComplete);
  location.href = "landing.html";
  // document.getElementById("landing-page").style.display = "block";
  // document.getElementById("landing-enter").addEventListener("click", (e) => {
  //   e.preventDefault();
  //   savePlayerData({ ...loadedPlayerData, landingPageComplete: true });
  //   document.getElementById("landing-page").style.display = "none";
  // });
}

// Hangman minigame code
const gameContainer = document.getElementById("game-container");

const introDialogue = [
  {
    text: "Pale man: Hello?",
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
  const musicButton = document.getElementById("music-button");
  const soundButton = document.getElementById("sound-button");
  const musicIcon = document.getElementById("music-icon");
  const soundIcon = document.getElementById("sound-icon");

  musicButton.addEventListener("click", () => {
    userAllowsMusic = !userAllowsMusic;
    if (userAllowsMusic) {
      musicIcon.src = "assets/images/music_on.webp";
      if (currentPath.includes("landing.html") && userAllowsMusic) {
        thunderstormAudio.play();
        // loop audio
        thunderstormAudio.addEventListener("ended", () => {
          thunderstormAudio.play();
        });
      }
    } else {
      musicIcon.src = "assets/images/music_off.webp";
      if (currentPath.includes("landing.html") && userAllowsMusic) {
        thunderstormAudio.pause();
      }
    }
    savePlayerData({ ...loadedPlayerData, playerAllowsMusic: userAllowsMusic });
  });

  soundButton.addEventListener("click", () => {
    userAllowsSounds = !userAllowsSounds;
    if (userAllowsSounds) {
      soundIcon.src = "assets/images/sound_on.webp";
    } else {
      soundIcon.src = "assets/images/sound_off.webp";
    }
    savePlayerData({
      ...loadedPlayerData,
      playerAllowsSound: userAllowsSounds,
    });
  });

  if (currentPath.includes("/landing.html")) return;

  if (userAllowsMusic) {
    darkAmbientMusicAudio.play();
    // loop audio
    darkAmbientMusicAudio.addEventListener("ended", () => {
      darkAmbientMusicAudio.play();
    });
  }

  // if esc key is pressed, loop through
  // minigames and remove active class
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const minigames = document.querySelectorAll(".minigame");
      for (const minigame of minigames) {
        minigame.classList.remove("active");
      }
      gameContainer.className = "";
      gameContainer.close();
    }
  });
  const ghost = document?.querySelector(".ghost-image");
  if (ghost) {
    ghost.classList.add("active");
  }

  // loop through 'interactive' and disable
  const interactiveButtons = document.querySelectorAll(".interactive");
  for (const button of interactiveButtons) {
    button.disabled = true;
    button.classList.add("disabled");
    button.setAttribute("aria-disabled", "true");
  }
  await showDialogueAsync(introDialogue);
  // loop through 'interactive' and enable
  for (const button of interactiveButtons) {
    button.disabled = false;
    button.classList.remove("disabled");
    button.setAttribute("aria-disabled", "false");
  }
  ghost.classList.remove("active");
});

// -------- Mini games functions ---------

// This function displays the first mini game
const miniGame1 = async () => {
  // play door open audio

  if (userAllowsSounds) {
    doorOpenAudio.play();
    setTimeout(() => {
      doorShutAudio.play();
    }, 1300);
  }
  if (userAllowsMusic) {
    creepyWhistlyMusicAudio.play();
  }

  await gameContainer.showModal();

  runHangmanGame();
};
// (window.location.href = "game1.html");

// This function displays the second mini game
const miniGame3 = async () => {
  gameContainer.showModal();
  gameContainer.classList.add("boy-ghost");
  const dialogue = [
    {
      text: "You walk to the stairs, where a young boy is sitting and playing a card game. His clothing is old, from another time. ",
    },
    {
      text: "He is not transparent as the first young man you encountered was, but there is a translucence to his skin.",
    },
    {
      text: "He looks at you with haunted eyes.",
    },
    {
      text: "“To discover the secrets of this house, choose the correct cards but you must remember where they lie...”",
    },
  ];
  await showDialogueAsync(dialogue, true);
  startMemoryGame();
};

// This function displays the lastquiz mini game
const miniGame2 = () => {
  let loadedPlayerData = loadPlayerData();
  if (
    !loadedPlayerData.hangmanClueObtained &&
    !loadedPlayerData.memoryClubObtained &&
    !loadedPlayerData.quizClueObtained
  ) {
    // alert("You need to complete the three games first!");
    return;
  }
  gameContainer.showModal();
  initLastQuizGame();
};

// This function displays the third mini game
const miniGame4 = () => {
  gameContainer.showModal();
  handlePlay();
};

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
    miniGame3();
  } else if (id == "door4") {
    miniGame4();
  }
};
