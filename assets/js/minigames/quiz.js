//jshint esversion:6
import { showDialogueAsync } from "../dialogue.js";
import { savePlayerData, loadPlayerData } from "../gamedata-localstore.js";

const gameContainer = document.getElementById("game-container");

// Array of quiz Questions, Answers and realated images
const questions = [
  {
    question: "What is the name of the killer in the 'Halloween' movie?",
    answers: [
      "Michael Myers",
      "Jason Voorhees",
      "Freddy Krueger",
      "Leatherface",
    ],
    correctAnswerIndex: 0,
    image: "./assets/images/horror-little-girl.webp",
  },
  {
    question: "Which phobia means you have an intense fear of Halloween?",
    answers: [
      "Halloweenophobia",
      "Hallowsphobia",
      "Samhainophobia",
      "Arachnophobia",
    ],
    correctAnswerIndex: 2,
    image: "./assets/images/horror-face.webp",
  },
  {
    question:
      "Halloween is also known as All Hallows Eve but what is another name for Hallows?",
    answers: [" Ghouls", "Ghosts", "Saints", "Howls"],
    correctAnswerIndex: 2,
    image: "./assets/images/horror-bride.webp",
  },
  {
    question: "Which famous magician died on Halloween in 1926?",
    answers: [
      "Harry Houdini",
      "David Copperfield",
      "David Blaine",
      "Derren Brown",
    ],
    correctAnswerIndex: 0,
    image: "./assets/images/horror-skeleton.webp",
  },
  {
    question: "If you were born on Halloween, what star sign would you be?",
    answers: ["Scorpio", "Libra", "Virgo", "Leo"],
    correctAnswerIndex: 0,
    image: "./assets/images/horror-house.webp",
  },
];

//Quiz questions and score variables
let currentQuestionIndex = 0;
let score = 0;

// Quiz card,text and button elements to be manipulated
const questionCard = document.getElementById("question-card");
const questionImage = document.getElementById("question-image");
const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const resultCard = document.getElementById("result-card");
const resultText = document.getElementById("result-text");
const correctAnswer = document.getElementById("correct-answer");
const nextButton = document.getElementById("next-button");
const scoreCard = document.getElementById("score-card");
const scoreText = document.getElementById("score-text");
const giftCard = document.getElementById("gift-card");
const failureText = document.getElementById("failure-text");
const playAgainButton = document.getElementById("play-again-button");
const endQuizButton = document.getElementById("end-quiz-button");
const endCard = document.getElementById("end-card");
const endText = document.getElementById("end-text");
const playButton = document.getElementById("play-button");
const backButton = document.getElementById("home-button");

//Quiz Functions
function displayQuestion(question) {
  /* This function displays the question card and answer buttons
   *  loops through the answers array and creates a button for each answer
   *  adds an event listener to each button
   *  and displays the next question card when the button is clicked
   */
  questionImage.src = question.image;
  questionText.textContent = question.question;
  answerButtons.innerHTML = "";
  for (let i = 0; i < question.answers.length; i++) {
    const button = document.createElement("button");
    button.textContent = question.answers[i];
    button.classList.add("btn");
    button.addEventListener("click", () => handleAnswer(i));
    answerButtons.appendChild(button);
  }
  questionCard.classList.remove("d-none");
  resultCard.classList.add("d-none");
}

function displayResult(correct) {
  // This function displays the result of the answered question
  if (correct) {
    resultText.textContent = "Correct!";
    correctAnswer.textContent = "";
  } else {
    resultText.textContent = "Wrong!";
    correctAnswer.textContent = `The correct answer is: ${
      questions[currentQuestionIndex].answers[
        questions[currentQuestionIndex].correctAnswerIndex
      ]
    }`;
  }
  questionCard.classList.add("d-none");
  resultCard.classList.remove("d-none");
}

function updateScore() {
  // This function updates the score
  score++;
  scoreText.textContent = `Score: ${score}/${questions.length}`;
}

function displayScore() {
  // This function displays the score
  scoreCard.classList.remove("d-none");
  if (score >= 3) {
    giftCard.classList.remove("d-none");
    let loadedPlayerData = loadPlayerData();
    savePlayerData({ ...loadedPlayerData, quizClueObtained: true });
  } else {
    failureText.classList.remove("d-none");
  }
}

function resetQuiz() {
  // This function resets the quiz
  currentQuestionIndex = 0;
  score = 0;
  questionCard.classList.add("d-none");
  resultCard.classList.add("d-none");
  scoreCard.classList.add("d-none");
  endCard.classList.add("d-none");
  playButton.classList.remove("d-none");
}

function handleAnswer(answerIndex) {
  /* This function handles the answer
   * Checks if the answer is correct
   * Updates the score
   * and displays the result
   */
  if (answerIndex === questions[currentQuestionIndex].correctAnswerIndex) {
    updateScore();
    displayResult(true);
  } else {
    displayResult(false);
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    nextButton.classList.remove("d-none");
  } else {
    displayScore();
  }
}

// Functions called on button eventlistening
async function handlePlay() {
  // This function handles the play button

  const dialogue = [
    {
      text: "Welcome to the Halloween quiz Hahaa!",
    },
    {
      text: "What happened to the young man who used to live here? He says he is only able to walk the mortal plane on Halloween",
    },
    {
      text: "We don’t know how he ended up there... but we can show you his burial place. All you have to do is answer our questions first...",
    },
  ];

  const quizContainer = document.getElementById("game-container");
  quizContainer.classList.add("quiz-foreground");

  await showDialogueAsync(dialogue, true);
  quizContainer.classList.remove("quiz-foreground");
  quizContainer.classList.add("quiz-container");
  document.getElementById("quiz-game").classList.add("active");
  displayQuestion(questions[currentQuestionIndex]);
  playButton.classList.add("d-none");
}

function handleNext() {
  // This function handles the next button
  displayQuestion(questions[currentQuestionIndex]);
  nextButton.classList.add("d-none");
}

function handlePlayAgain() {
  // This function handles the play again button
  resetQuiz();
  handlePlay();
}

function handleEndQuiz() {
  /* This function handles the end quiz functionality
   *  and displays the end game card with clue for the final stage quiz
   */
  endText.textContent =
    "The young man is buried under the trees next to the mansion";
  questionCard.classList.add("d-none");
  resultCard.classList.add("d-none");
  scoreCard.classList.add("d-none");
  endCard.classList.remove("d-none");
}

function handleConfirmEnd() {
  // This function confirms end of quiz with a message
  endText.textContent = "I wish you well in the next stage!";
  endCard.classList.remove("d-none");
}

function handleBackHome() {
  // This function handles the exit button to exit quiz
  gameContainer.close();
}

//Event Listeners
playButton?.addEventListener("click", handlePlay);
nextButton?.addEventListener("click", handleNext);
playAgainButton?.addEventListener("click", handlePlayAgain);
endQuizButton?.addEventListener("click", handleEndQuiz);
endCard?.addEventListener("click", handleConfirmEnd);
backButton?.addEventListener("click", handleBackHome);

export { handlePlay };
