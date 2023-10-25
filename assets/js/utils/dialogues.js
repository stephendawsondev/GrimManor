/**
 * The opening ghost dialogue
 * @typedef {Object} Dialogue
 */
const introDialogue = [
  {
    text: "Pale man: Hello?",
    choices: [
      {
        text: "You: Are you a ghost?",
        action: () => ({
          newDialogue: { text: "I think... I am" },
        }),
      },
      {
        text: "You: Are you okay?",
        action: () => ({
          newDialogue: { text: "I think... I am a ghost" },
        }),
      },
    ],
  },
  {
    text: "Okay...",
    choices: [
      {
        text: "You: Are you a friendly ghost?",
        action: () => ({
          newDialogue: { text: "I am, but there are others here..." },
        }),
      },
      {
        text: "You: Should I run away screaming?",
        action: () => ({
          newDialogue: { text: "Not from me..." },
        }),
      },
    ],
  },
  {
    text: "It's very cold outside.",
    choices: [
      {
        text: "You: Can I stay a while?",
        action: () => ({
          newDialogue: {
            text: "That depends, will you help me with something?",
          },
        }),
      },
      {
        text: "You: Is it safe for me here?",
        action: () => ({
          newDialogue: {
            text: "I can keep you safe, if you help me with something.",
          },
        }),
      },
    ],
  },
  {
    text: "I need help finding out why I am stuck here in this house...",
    choices: [
      {
        text: "You: But I scare easily...",
        action: () => ({
          newDialogue: {
            text: "You’ll be fine.",
          },
        }),
      },
      {
        text: "You: I can help you.",
        action: () => ({
          newDialogue: {
            text: "Thank you.",
          },
        }),
      },
    ],
  },
  {
    text: "I have been trapped in this house for centuries.. able only to be seen by the human realm on Halloween...",
  },
  {
    text: "I do not know why I am trapped, but I am sure that if I knew why I died then I would be able to move on...",
  },
  {
    text: "There are many clues hidden in this house – are you bold enough to find them?",
  },
];

const returnedButIncomplete = [
  {
    text: "You have returned, thank you for your help so far...",
  },
];

/**
 * Final door dialogue
 * @typedef {Object} Dialogue
 */
const notEnoughCluesDialogue = [
  { text: "You haven't yet found all the clues... please keep trying..." },
];

/**
 * The dialogue for the hangman game
 * @typedef {Object} Dialogue
 */
const hangmanIntroDialogue = [
  {
    text: "You try the door on the left and enter a cluttered, dimly lit room.",
  },
  {
    text: "The smell of damp and incense hangs heavy in the air.",
  },
  {
    text: "A wizened old woman sits at a table in the centre of the room, surrounded my many dusty trinkets and books.",
  },
  { text: "In front of her she has a Ouija board..." },
];

/**
 * The dialogue for the hangman game
 * @typedef {Object} Dialogue
 */
const hangmanWinDialogue = [
  {
    text: "They say the young man’s fiancée married another man…",
    choices: [
      {
        text: "Thank you... I'll be going...",
        action: () => {
          const gameContainer = document.getElementById("game-container");
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
];

/**
 * The dialogue for the hangman game
 * @typedef {Object} Dialogue
 */
const hangmanLoseDialogue = [
  {
    text: "I'm sorry, dear... not this time...",
    choices: [
      {
        text: "Close",
        action: () => {
          const gameContainer = document.getElementById("game-container");
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
];

/**
 * The dialogue for the hangman game
 * @typedef {Object} Dialogue
 */
const hangmanReturnDialogue = [
  {
    text: "Welcome back, dear... you already know the young man’s fiancée married another man…",
  },
  {
    text: "But please, stay and chat...",
  },
];

/**
 * The dialogue for the memory game
 * @typedef {Object} Dialogue
 */
const memoryGameInitialDialgoue = [
  {
    text: "You walk to the stairs, where a young boy is sitting and playing a card game. His clothing is old, from another time. ",
  },
  {
    text: "He is not transparent as the first young man you encountered was, but there is a translucence to his skin.",
  },
  {
    text: "He looks at you with haunted eyes.",
  },
  {
    text: "“To discover the secrets of this house, choose the correct cards but you must remember where they lie...”",
  },
];

/**
 * The dialogue for the memory game
 * @typedef {Object} Dialogue
 */
const memoryGameEndDialgoue = [
  {
    text: "In his high child’s voice, the boy says:",
  },
  {
    text: "“The man who owned this house hung himself many years ago…”",
  },
  {
    text: "“They say his spirit still haunts these halls but I have never seen him...”",
  },
];

export {
  introDialogue,
  returnedButIncomplete,
  notEnoughCluesDialogue,
  hangmanIntroDialogue,
  hangmanWinDialogue,
  hangmanLoseDialogue,
  hangmanReturnDialogue,
  memoryGameInitialDialgoue,
  memoryGameEndDialgoue,
};
