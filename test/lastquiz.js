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

const quizButtons = document.querySelectorAll(".button-lastquiz");
const questionElement = document.getElementById("question");
const evaluationElement = document.getElementById("evaluation");

let number_test = 0;
let score = 0;

nextQuestion = () => {
  number_test++;
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
      temp++;
      if (temp !== number_test) continue;
      console.log(`${key}: ${value}`);
      questionElement.textContent = value.question;
      for (const [key2, value2] of Object.entries(value.answers)) {
        console.log(`${value.correctAnswer} - ${key2}: ${value2}`);
        button = document.getElementById(`${key2}`);
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
};

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

function gameLastQuiz_over() {
  quizButtons.forEach((button) => {
    button.removeEventListener("click", () => {});
  });
}

function initLastQuizGame() {
  score = 0;
  const gameLastQuizElement = document.getElementById("game-lastquiz");
  gameLastQuizElement.style.display = "block";
}

initLastQuizGame();
