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
  memoryGameInitialDialgoue,
  memoryGameEndDialgoue,
  returnedButIncomplete,
};
