import { showDialogueAsync } from "../dialogue.js";

const guessedLetters = [];

const checkLetter = (letter, buttonElement) => {
  if (guessedLetters.includes(letter)) return;

  guessedLetters.push(letter);

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
      checkLetter(button.innerText, button);
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
