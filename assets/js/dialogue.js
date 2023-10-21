let dialogueQueue = [];
let dialogueIndex = 0;
let appendToGameContainer = false;

const showDialogue = (dialogue, appendToContainer = false) => {
  dialogueQueue = dialogue;
  dialogueIndex = 0;
  appendToGameContainer = appendToContainer;
  updateDialogue();
};

const updateDialogue = () => {
  const parentElement = appendToGameContainer
    ? document.getElementById("game-container")
    : document.body;
  const dialogueBox = document.getElementById("dialogue-box");

  if (dialogueIndex < dialogueQueue.length) {
    dialogueBox.classList.add("active");
    const dialogueText = dialogueBox.querySelector("#dialogue-text");
    const choicesContainer = dialogueBox.querySelector("#choices-container");

    dialogueText.innerText = dialogueQueue[dialogueIndex].text;

    choicesContainer.innerHTML = "";

    if (dialogueQueue[dialogueIndex].choices) {
      for (const choice of dialogueQueue[dialogueIndex].choices) {
        const choiceButton = document.createElement("button");
        choiceButton.innerText = choice.text;
        choiceButton.addEventListener("click", (event) => {
          event.stopPropagation();
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

    if (dialogueBox.parentElement) {
      dialogueBox.parentElement.removeChild(dialogueBox);
    }
    parentElement.appendChild(dialogueBox);
  } else {
    dialogueBox.classList.remove("active");
    if (dialogueBox.parentElement) {
      dialogueBox.parentElement.removeChild(dialogueBox);
    }
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
