import { showDialogueAsync } from "../dialogue.js";
import { savePlayerData, loadPlayerData } from "../gamedata-localstore.js";
let loadedPlayerData = loadPlayerData();

const guessedLetters = [];
const gameContainer = document.getElementById("game-container");
const hangmanContainer = document.getElementById("hangman-game");

const drawInitialScene = () => {
  const canvas = document.getElementById("stickman");
  const context = canvas.getContext("2d");
  context.lineWidth = 4;

  context.beginPath();
  context.moveTo(20, 180);
  context.lineTo(180, 180);
  context.moveTo(100, 180);
  context.lineTo(100, 40);
  context.lineTo(160, 40);
  context.lineTo(160, 80);
  context.stroke();

  context.beginPath();
  context.moveTo(160, 80);
  context.lineTo(160, 80);
  context.stroke();
};

let incorrectGuessCount = 0;
const drawHangman = () => {
  const canvas = document.getElementById("stickman");
  const context = canvas.getContext("2d");
  context.lineWidth = 4;

  switch (incorrectGuessCount) {
    case 0:
      // Draw hanging apparatus
      context.beginPath();
      context.moveTo(20, 180);
      context.lineTo(180, 180);
      context.moveTo(100, 180);
      context.lineTo(100, 40);
      context.lineTo(160, 40);
      context.lineTo(160, 80);
      context.stroke();
      break;
    case 1:
      // Draw head
      context.beginPath();
      context.arc(160, 90, 10, 0, Math.PI * 2);
      context.stroke();
      break;
    case 2:
      // Draw body
      context.beginPath();
      context.moveTo(160, 100);
      context.lineTo(160, 140);
      context.stroke();
      break;
    case 3:
      // left arm
      context.beginPath();
      context.moveTo(160, 110);
      context.lineTo(145, 125);
      context.stroke();
      break;
    case 4:
      // right arm
      context.beginPath();
      context.moveTo(160, 110);
      context.lineTo(175, 125);
      context.stroke();
      break;
    case 5:
      // left leg
      context.beginPath();
      context.moveTo(160, 140);
      context.lineTo(145, 155);
      context.stroke();
      break;
    case 6:
      // right leg
      context.beginPath();
      context.moveTo(160, 140);
      context.lineTo(175, 155);
      context.stroke();
      break;
  }
};

const checkLetter = (letter, buttonElement, phraseArr) => {
  if (guessedLetters.includes(letter)) return;

  guessedLetters.push(letter);
  if (
    !phraseArr
      .map((letter) => letter.toUpperCase())
      .includes(letter.toUpperCase())
  ) {
    incorrectGuessCount++;
    drawHangman();
  }
  // Disable the button and change its appearance
  buttonElement.disabled = true;
  buttonElement.classList.add("disabled");
  buttonElement.setAttribute("aria-disabled", "true");

  const letterSpans = document.querySelectorAll(".hangman-letter");

  for (const span of letterSpans) {
    if (
      guessedLetters
        .map((letter) => letter.toUpperCase())
        .includes(span.dataset.letter.toUpperCase())
    ) {
      span.innerText = span.dataset.letter;
      span.classList.add("revealed");
    }
  }
  const status = checkGameStatus(phraseArr);
  if (status !== "ongoing") {
  }
};

const checkGameStatus = async (phraseArr) => {
  // Check if won
  const letterSpans = document.querySelectorAll(".hangman-letter");
  const revealedSpans = document.querySelectorAll(".hangman-letter.revealed");
  if (letterSpans.length === revealedSpans.length) {
    const winDialogue = [
      {
        text: "The man who owned this house hung himself many years ago... they say his spirit still haunts these halls but I have never seen him",
        choices: [
          {
            text: "Thank you... I'll be going...",
            action: () => {
              gameContainer.classList.remove("wooden-table");
              gameContainer.classList.remove("old-woman");
              // loop through minigames and remove active class
              const minigames = document.querySelectorAll(".minigame");
              for (const minigame of minigames) {
                minigame.classList.remove("active");
              }
              savePlayerData({
                ...loadedPlayerData,
                hangmanClueObtained: true,
              });
              gameContainer.close();
            },
          },
        ],
      },
    ];

    hangmanContainer.classList.remove("active");
    gameContainer.classList.add("old-woman");
    await showDialogueAsync(winDialogue, true);
    return "won";
  }

  // Check if lost
  if (incorrectGuessCount >= 6) {
    const dialogue = [
      {
        text: "I'm sorry, dear... not this time...",
        choices: [
          {
            text: "Close",
            action: () => {
              gameContainer.classList.remove("old-woman");
              // loop through minigames and remove active class
              const minigames = document.querySelectorAll(".minigame");
              for (const minigame of minigames) {
                minigame.classList.remove("active");
              }
              gameContainer.close();
            },
          },
        ],
      },
    ];

    hangmanContainer.classList.remove("active");
    gameContainer.classList.add("old-woman");
    await showDialogueAsync(dialogue, true);
  }

  return "ongoing";
};

const resetGame = () => {
  guessedLetters.length = 0;
  incorrectGuessCount = 0;
  // reset canvas
  const canvas = document.getElementById("stickman");
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);

  // reset letter buttons
  const letterButtons = document.querySelectorAll(
    ".ouija-board-alphabet-letter"
  );
  for (const button of letterButtons) {
    button.disabled = false;
    button.classList.remove("disabled");
    button.setAttribute("aria-disabled", "false");
  }
};

const runHangmanGame = async () => {
  // if esc key is pressed, loop through
  // minigames and remove active class
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const minigames = document.querySelectorAll(".minigame");
      for (const minigame of minigames) {
        minigame.classList.remove("active");
      }
      gameContainer.close();
    }
  });
  // reset the game
  resetGame();

  const dialogue = [
    {
      text: "You try the door on the left and enter a cluttered, dimly lit room.",
    },
    {
      text: "The smell of damp and incense hangs heavy in the air.",
    },
    {
      text: "A wizened old woman sits at a table in the centre of the room, surrounded my many dusty trinkets and books.",
    },
    { text: "In front of her she has a Ouija board..." },
  ];

  gameContainer.classList.add("old-woman");
  await showDialogueAsync(dialogue, true);
  gameContainer.classList.remove("old-woman");
  gameContainer.classList.add("wooden-table");
  hangmanContainer.classList.add("active");

  drawInitialScene();

  const phraseArr = "She married someone else".split("");

  const phraseContainer = document.querySelector(".hangman-phrase-container");
  const hangmanPhrase = document.querySelector(".hangman-phrase");

  // check if letters letterContainer is empty
  if (hangmanPhrase.hasChildNodes()) {
    hangmanPhrase.innerHTML = "";
  }
  for (const letter of phraseArr) {
    const letterContainer = document.createElement("div");
    letterContainer.classList.add("hangman-letter-container");
    const letterSpan = document.createElement("span");

    if (letter !== " ") {
      letterSpan.classList.add("hangman-letter");
      letterSpan.dataset.letter = letter;
    } else {
      letterContainer.classList.add("hangman-letter-space");
    }

    letterContainer.appendChild(letterSpan);
    hangmanPhrase.appendChild(letterContainer);
  }

  // Add event listeners to letter buttons
  const letterButtons = document.querySelectorAll(
    ".ouija-board-alphabet-letter"
  );
  for (const button of letterButtons) {
    if (guessedLetters.includes(button.innerText)) {
      button.disabled = true;
      button.classList.add("disabled");
      button.setAttribute("aria-disabled", "true");
    }

    button.addEventListener("click", () => {
      checkLetter(button.innerText, button, phraseArr);
    });
  }
};

export { runHangmanGame };
