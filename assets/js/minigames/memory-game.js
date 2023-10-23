import { showDialogueAsync } from "../dialogue.js";
const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;

const totalPairs = cards.length / 2;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

async function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  matchedPairs++;
  if (matchedPairs === totalPairs) {
    document.getElementById("memory-game").classList.remove("active");
    const dialogue = [
      {},
      {
        text: "In his high child’s voice, the boy says:",
      },
      {
        text: "“They say the young man’s fiancée married another man...”",
      },
    ];
    await showDialogueAsync(dialogue, true);
    const gameContainer = document.getElementById("game-container");
    gameContainer.classList.remove("boy-ghost");
    gameContainer.close();
  }

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffleCards() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

cards.forEach((card) => card.addEventListener("click", flipCard));

export { flipCard };

function startMemoryGame() {
  shuffleCards();
  cards.forEach((card) => card.addEventListener("click", flipCard));
  document.getElementById("memory-game").classList.add("active");
}

export { startMemoryGame };
