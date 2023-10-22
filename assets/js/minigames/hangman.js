import { showDialogueAsync } from "../dialogue.js";

const guessedLetters = [];

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
  console.log(guessedLetters);
};

const runHangmanGame = () => {
  const hangmanContainer = document.getElementById("hangman-game");

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

  const dialogue = [
    { text: "Hello, welcome to the haunted mansion." },
    {
      text: "Do you want to enter?",
      choices: [
        { text: "Yes", action: () => console.log("Yes") },
        { text: "No", action: () => console.log("Leaving mansion...") },
      ],
    },
    { text: "Thanks for coming in." },
    { text: "You've entered the mansion." },
  ];

  // showDialogueAsync(dialogue, true);
};

export { runHangmanGame };
