import { savePlayerData, loadPlayerData } from "../gamedata-localstore.js";
import { showDialogueAsync } from "../dialogue.js";
const gameContainer = document.getElementById("game-container");
const lastquizContainer = document.getElementById("game-lastquiz");

const lastquiz = {
  form1: {
    question: "What is your name?",
    answers: {
      a: "Was poisoned",
      b: "Hung self",
      c: "Stabbed by a rival",
    },
    correctAnswer: "b",
  },
  form2: {
    question: "Why did I die?",
    answers: {
      a: "Fiancé married someone else",
      b: "Accidentally",
      c: "Kissed another man's wife",
    },
    correctAnswer: "a",
  },
  form3: {
    question: "Where is my body?",
    answers: {
      a: "In the lake",
      b: "Hidden in the attic",
      c: "Buried under the trees next to the house",
    },
    correctAnswer: "c",
  },
};

const quizButtons = document?.querySelectorAll(".button-lastquiz");
const questionElement = document?.getElementById("question");
const evaluationElement = document?.getElementById("evaluation");

let number_test = 0;
let score = 0;

function nextQuestion() {
  number_test++;
  console.log("nextQuestion", number_test);
  if (number_test === 4) {
    gameLastQuiz_over();
    // return;
  } else {
    // evaluationElement.textContent = ``;
    let temp = 0;
    quizButtons.forEach((button) => {
      button.removeEventListener("click", () => {});
    });
    for (const [key, value] of Object.entries(lastquiz)) {
      let button;
      temp++;
      if (temp !== number_test) continue;
      // console.log(`${key}: ${value}`);
      if (questionElement) {
        questionElement.textContent = value.question;
      }

      for (const [key2, value2] of Object.entries(value.answers)) {
        // console.log(`${value.correctAnswer} - ${key2}: ${value2}`);
        button = document?.getElementById(`${key2}`);
        if (button) {
          button.textContent = value2;
          button.removeEventListener("click", () => {});

          if (key2 === value.correctAnswer) {
            button.classList.add("selected");
          } else {
            button.classList.remove("selected");
          }
        }
      }
    }
  }
}

quizButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("selected")) {
      score++;
      evaluationElement.textContent = `Correct`;
      // alert("Correct");
    } else {
      evaluationElement.textContent = `False`;
    }
    setTimeout(() => {
      evaluationElement.textContent = ``;
    }, 1000);
    nextQuestion();
  });
});

nextQuestion();

async function gameLastQuiz_over() {
  quizButtons.forEach((button) => {
    button.removeEventListener("click", () => {});
  });
  document.getElementById("game-lastquiz").classList.remove("active");
  console.log("gameLastQuiz_over", score);

  const dialogue = [
    {
      text: "That’s right I remember now… She said she loved me… But she betrayed me.",
    },
    {
      text: "I have wandered these halls for centuries filled with pain and anger but the memories left me long ago.",
    },
    {
      text: "Thank you for your assistance, I feel that I can move on now. I am forever in your debt!",
    },
  ];

  gameContainer.classList.add("lastquiz-table");
  await showDialogueAsync(dialogue, true);

  const minigames = document.querySelectorAll(".minigame");
  for (const minigame of minigames) {
    minigame.classList.remove("active");
  }
  gameContainer.close();
}

async function initLastQuizGame() {
  let loadedPlayerData = loadPlayerData();
  if (
    !loadedPlayerData.hangmanClueObtained &&
    !loadedPlayerData.memoryClubObtained &&
    !loadedPlayerData.quizClueObtained
  ) {
    return;
  } else {
    score = 0;
    number_test = 0;
    // const gameLastQuizElement = document.getElementById("game-lastquiz");
    // gameLastQuizElement.style.display = "block";
    const dialogue = [
      {
        text: "Have you managed to discover what happened to me?",
      },
    ];

    gameContainer.classList.add("lastquiz-table");
    await showDialogueAsync(dialogue, true);
    document.getElementById("game-lastquiz").classList.add("active");

    lastquizContainer.classList.add("active");
  }
}

//initLastQuizGame();

export { initLastQuizGame };
