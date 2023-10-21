//jshint esversion:6

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
    image: (src = "./assets/images/horror-little-girl.webp"),
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
    image: (src = "./assets/images/horror-face.webp"),
  },
  {
    question:
      "Halloween is also known as All Hallows Eve but what is another name for Hallows?",
    answers: [" Ghouls", "Ghosts", "Saints", "Howls"],
    correctAnswerIndex: 2,
    image: (src = "./assets/images/horror-bride.webp"),
  },
  {
    question: "Which famous magician died on Halloween in 1926?",
    answers: [
      "Harry Houdini",
      "David Copperfield",
      "David Baline",
      "Derren Brown",
    ],
    correctAnswerIndex: 0,
    image: (src = "./assets/images/horror-skeleton.webp"),
  },
  {
    question: "If you were born on Halloween, what star sign would you be?",
    answers: ["Scorpio", "Libra", "Virgo", "Leo"],
    correctAnswerIndex: 0,
    image: (src = "./assets/images/horror-house.webp"),
  },
];

//Quiz questions and score variables
let currentQuestionIndex = 0;
let score = 0;
