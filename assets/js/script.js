// jshint esversion: 6

// Minigames code
import { runHangmanGame } from "./minigames/hangman.js";
import { startMemoryGame } from "./minigames/memory-game.js";
import { handlePlay } from "./minigames/quiz.js";
import { initLastQuizGame } from "./minigames/lastquiz.js";
import { showDialogueAsync } from "./utils/dialogueGeneration.js";
import {
  savePlayerData,
  loadPlayerData,
  updateLocalProperty,
} from "./utils/gamedataLocalstore.js";
import {
  userAllowsMusic,
  userAllowsSounds,
  loadAudio,
  addAudioIconEventListeners,
} from "./utils/audioSettings.js";
import {
  introDialogue,
  returnedButIncomplete,
  memoryGameInitialDialgoue,
} from "./utils/dialogues.js";

// Get the current pathname
const currentPath = window.location.pathname;

const setVideoSource = () => {
  const videoElement = document.querySelector("#haunted-mansion video");
  const windowWidth = window.innerWidth;
  // Set the source based on screen width if on the landing page
  if (windowWidth <= 600) {
    videoElement.src = "../assets/images/haunted-mansion-mobile.webm";
  } else if (windowWidth <= 1024) {
    videoElement.src = "../assets/images/haunted-mansion-tablet.webm";
  } else {
    videoElement.src = "../assets/images/haunted-mansion.webm";
  }
  // Explicitly tell the video element to load the new source
  videoElement.load();
};

const playMusicOnLoop = (audio) => {
  audio.loop = true;
  audio.play();
};

document.addEventListener("DOMContentLoaded", async () => {
  // Mansion interaction code
  const backgroundImage = document.getElementById("background-image"); // Select the background image
  const moveButtons = document.querySelectorAll("button"); // Select all buttons with the "move" class
  const mansionView = document.getElementById("mansion-container"); // Select the container with the mansion image
  const gameContainer = document.getElementById("game-container");
  const interactiveButtons = document.querySelectorAll(".interactive");
  const DEBUG = false;

  let loadedPlayerData = loadPlayerData();
  const audioObj = loadAudio();
  addAudioIconEventListeners();

  if (!loadedPlayerData.landingPageComplete) {
    const hauntedMansionView = document.getElementById("haunted-mansion");
    const enterButton = document.getElementById("landing-enter");
    playMusicOnLoop(audioObj.thunderstorm);
    hauntedMansionView.classList.add("in-play");
    setVideoSource();
    // Listen for window resize
    window.addEventListener("resize", setVideoSource);

    enterButton.addEventListener("click", () => {
      hauntedMansionView.classList.remove("in-play");
      mansionView.classList.add("in-play");
      savePlayerData({
        ...loadedPlayerData,
        landingPageComplete: true,
      });
    });
  } else {
    mansionView.classList.add("in-play");
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
  for (const button of interactiveButtons) {
    button.disabled = true;
    button.classList.add("disabled");
    button.setAttribute("aria-disabled", "true");
    // Add a click event to each button
    button.addEventListener("click", function () {
      displayMiniGames(this.id);
    });
  }
  if (loadedPlayerData.firstTimePlaying) {
    await showDialogueAsync(introDialogue);
    updateLocalProperty("firstTimePlaying", false);
  } else {
    await showDialogueAsync(returnedButIncomplete);
  }

  // loop through 'interactive' and enable
  for (const button of interactiveButtons) {
    button.disabled = false;
    button.classList.remove("disabled");
    button.setAttribute("aria-disabled", "false");
  }
  ghost.classList.remove("active");

  // Debug actions of button (show/hide buttons)
  if (DEBUG) {
    document.onmousemove = function (e) {
      var x = e.pageX;
      var y = e.pageY;
      e.target.title = "X is " + x + " and Y is " + y;
    };
  }
  const buttonDebug = document?.getElementById("button-debug");

  buttonDebug.addEventListener("click", function () {
    const buttons = document.querySelectorAll(".interactive");
    buttons.forEach((button) => {
      button.classList.toggle("show");
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

  if (!currentPath.includes("landing.html")) {
    // Add a click event to each button to move the background image
    moveButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const direction = event.target.id.replace("move-", "");
        moveBackground(direction);
      });
    });
  }

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

    updateButtonsPos(
      top - backgroundImage.offsetTop,
      left - backgroundImage.offsetLeft
    );
    //backgroundImage.style.top = top + "px";
    //backgroundImage.style.left = left + "px";
    backgroundImage.style.marginTop = top + "px";
    backgroundImage.style.marginLeft = left + "px";
  }

  // -------- Mini games functions ---------

  // This function displays the first mini game
  const miniGame1 = async () => {
    // play door open audio

    if (userAllowsSounds) {
      playDoorAudio();
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

    await showDialogueAsync(memoryGameInitialDialgoue, true);
    startMemoryGame();
    playStairsAudio();
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
});
