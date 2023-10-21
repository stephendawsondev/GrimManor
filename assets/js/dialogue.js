let dialogueQueue = [];
let dialogueIndex = 0;

const showDialogue = (dialogue) => {
  dialogueQueue = dialogue;
  dialogueIndex = 0;
  updateDialogue();
};

const updateDialogue = () => {
  const dialogueBox = document.getElementById("dialogue-box");
  const dialogueText = document.getElementById("dialogue-text");
  const choicesContainer = document.getElementById("choices-container");

  if (dialogueIndex < dialogueQueue.length) {
    dialogueBox.classList.add("active");
    dialogueText.innerText = dialogueQueue[dialogueIndex].text;

    choicesContainer.innerHTML = ""; // Clear previous choices
    if (dialogueQueue[dialogueIndex].choices) {
      for (const choice of dialogueQueue[dialogueIndex].choices) {
        const choiceButton = document.createElement("button");
        choiceButton.innerText = choice.text;
        choiceButton.addEventListener("click", (event) => {
          event.stopPropagation(); // Stop event bubbling
          if (choice.action) {
            choice.action();
          }
          dialogueIndex++;
          updateDialogue();
          attachContinueListeners();
        });
        choicesContainer.appendChild(choiceButton);
      }
      detachContinueListeners();
    } else {
      attachContinueListeners();
    }
  } else {
    dialogueBox.classList.remove("active");
  }
};

const attachContinueListeners = () => {
  window.addEventListener("click", continueDialogue);
  window.addEventListener("keypress", continueDialogue);
  window.addEventListener("touchstart", continueDialogue);
};

const detachContinueListeners = () => {
  window.removeEventListener("click", continueDialogue);
  window.removeEventListener("keypress", continueDialogue);
  window.removeEventListener("touchstart", continueDialogue);
};

const continueDialogue = () => {
  dialogueIndex++;
  updateDialogue();
};

export { showDialogue };
