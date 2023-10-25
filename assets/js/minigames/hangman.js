import { showDialogueAsync } from "../utils/dialogueGeneration.js";
import { savePlayerData, loadPlayerData } from "../utils/gamedataLocalstore.js";
import {
  hangmanIntroDialogue,
  hangmanWinDialogue,
  hangmanLoseDialogue,
  hangmanReturnDialogue,
} from "../utils/dialogues.js";
let loadedPlayerData = loadPlayerData();

const gameContainer = document.getElementById("game-container");
const hangmanContainer = document.getElementById("hangman-game");

const gameState = {
  guessedLetters: [],
  incorrectGuessCount: 0,
  phraseArr: "",
};

const halloweenWords = [
  "All Hallows Eve",
  "Haunted House",
  "Witchcraft",
  "Monster",
  "Cobweb",
  "Cauldron",
  "Broomstick",
  "Vampire",
  "Full Moon",
  "Black Cat",
  "Tombstone",
  "Cursed",
  "Halloween",
  "Skeleton",
  "Spectre",
  "Jack O Lantern",
  "Creepy",
  "Potion",
  "Banshee",
  "Zombie",
  "Dracula",
  "Enchanted",
  "Phantom",
  "Ghoul",
  "Werewolf",
  "Midnight",
  "Poltergeist",
  "Seance",
  "Trick Or Treat",
  "Bat",
];

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

const drawHangman = () => {
  const canvas = document.getElementById("stickman");
  const context = canvas.getContext("2d");
  context.lineWidth = 4;

  switch (gameState.incorrectGuessCount) {
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

const checkLetter = (letter, buttonElement) => {
  const phraseArr = gameState.phraseArr.split("");
  if (gameState.guessedLetters.includes(letter)) return;

  gameState.guessedLetters.push(letter);
  if (
    !phraseArr
      .map((letter) => letter.toUpperCase())
      .includes(letter.toUpperCase())
  ) {
    gameState.incorrectGuessCount++;
    drawHangman();
  }
  // Disable the button and change its appearance
  buttonElement.disabled = true;
  buttonElement.classList.add("disabled");
  buttonElement.setAttribute("aria-disabled", "true");

  const letterSpans = document.querySelectorAll(".hangman-letter");

  for (const span of letterSpans) {
    if (
      gameState.guessedLetters
        .map((letter) => letter.toUpperCase())
        .includes(span.dataset.letter.toUpperCase())
    ) {
      span.innerText = span.dataset.letter;
      span.classList.add("revealed");
    }
  }
  const status = checkGameStatus(gameState.phraseArr);
  if (status !== "ongoing") {
  }
};

const handleClick = (button) => () => checkLetter(button.innerText, button);

const checkGameStatus = async (phrase) => {
  // Check if won
  const letterSpans = document.querySelectorAll(".hangman-letter");
  const revealedSpans = document.querySelectorAll(".hangman-letter.revealed");
  if (letterSpans.length === revealedSpans.length) {
    hangmanContainer.classList.remove("active");
    gameContainer.classList.add("old-woman");
    savePlayerData({
      ...loadedPlayerData,
      hangmanClueObtained: true,
    });
    if (loadedPlayerData.hangmanClueObtained) {
      await showDialogueAsync(
        [
          {
            text: `Yes, dear... "${phrase}" is correct... well done...`,
            choices: [
              {
                text: "Thank you... I'll be going...",
                action: () => {
                  const gameContainer =
                    document.getElementById("game-container");
                  gameContainer.classList.remove("wooden-table");
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
        ],
        true
      );
    } else {
      await showDialogueAsync(hangmanWinDialogue, true);
    }

    return "won";
  }

  // Check if lost
  if (gameState.incorrectGuessCount >= 6) {
    hangmanContainer.classList.remove("active");
    gameContainer.classList.add("old-woman");
    if (loadedPlayerData.hangmanClueObtained) {
      await showDialogueAsync(
        [{ text: `Silly child... it was clearly "${phrase}"...` }],
        true
      );
    }
    await showDialogueAsync(hangmanLoseDialogue, true);
  }

  return "ongoing";
};

const resetGame = () => {
  gameState.guessedLetters.length = 0;
  gameState.incorrectGuessCount = 0;

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
  loadedPlayerData = loadPlayerData();
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

  const initialClue = "She married someone else";
  const newClue =
    halloweenWords[Math.floor(Math.random() * halloweenWords.length)];

  gameState.phraseArr = loadedPlayerData.hangmanClueObtained
    ? newClue
    : initialClue;

  gameContainer.classList.add("old-woman");
  let dialogue = loadedPlayerData.hangmanClueObtained
    ? hangmanReturnDialogue
    : hangmanIntroDialogue;
  await showDialogueAsync(dialogue, true);
  gameContainer.classList.remove("old-woman");
  gameContainer.classList.add("wooden-table");
  hangmanContainer.classList.add("active");

  drawInitialScene();

  const phraseContainer = document.querySelector(".hangman-phrase-container");
  const hangmanPhrase = document.querySelector(".hangman-phrase");

  // check if letters letterContainer is empty
  if (hangmanPhrase.hasChildNodes()) {
    hangmanPhrase.innerHTML = "";
  }
  for (const letter of gameState.phraseArr) {
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
    if (gameState.guessedLetters.includes(button.innerText)) {
      button.disabled = true;
      button.classList.add("disabled");
      button.setAttribute("aria-disabled", "true");
    }

    for (const button of letterButtons) {
      const clickListener = handleClick(button);
      button.addEventListener("click", clickListener);
      button.__clickListener = clickListener;
    }
  }
};

export { runHangmanGame };
