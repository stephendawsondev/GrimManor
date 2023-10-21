const runHangmanGame = () => {
  const gameContainer = document.getElementById("hangman-game");

  gameContainer.classList.add("active");

  const phraseArr = "Hello World!".split("");
  const phraseContainer = document.querySelector("hangman-phrase-container");
  const hangmanPhrase = document.querySelector("hangman-phrase");

  for (const letter of phraseArr) {
    const letterContainer = document.createElement("div");
    letterContainer.classList.add("hangman-letter-container");

    const letterSpan = document.createElement("span");
    letterSpan.classList.add("hangman-letter");
    letterSpan.innerText = letter;

    letterContainer.appendChild(letterSpan);
    hangmanPhrase.appendChild(letterContainer);
  }
};

export { runHangmanGame };
