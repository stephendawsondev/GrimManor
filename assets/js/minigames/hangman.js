import { showDialogueAsync } from "../dialogue.js";
const runHangmanGame = () => {
  const gameContainer = document.getElementById("hangman-game");

  gameContainer.classList.add("active");

  const phraseArr = "Hello World!".split("");
  const phraseContainer = document.querySelector(".hangman-phrase-container");
  const hangmanPhrase = document.querySelector(".hangman-phrase");

  for (const letter of phraseArr) {
    const letterContainer = document.createElement("div");
    letterContainer.classList.add("hangman-letter-container");

    const letterSpan = document.createElement("span");
    letterSpan.classList.add("hangman-letter");
    letterSpan.innerText = letter;

    letterContainer.appendChild(letterSpan);
    hangmanPhrase.appendChild(letterContainer);
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

  showDialogueAsync(dialogue, true);
};

export { runHangmanGame };
