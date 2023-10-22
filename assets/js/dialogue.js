let dialogueQueue = [];
let dialogueIndex = 0;
let appendToGameContainer = false;

const showDialogueAsync = (dialogue, appendToContainer = false) => {
  return new Promise((resolve) => {
    const showDialogue = (dialogue, appendToContainer = false, onComplete) => {
      dialogueQueue = dialogue;
      dialogueIndex = 0;
      appendToGameContainer = appendToContainer;
      updateDialogue(onComplete);
    };

    const updateDialogue = (onComplete) => {
      const parentElement = appendToGameContainer
        ? document.getElementById("game-container")
        : document.body;
      const dialogueBox = document.getElementById("dialogue-box");
      // console.log("dialogueBox: " + dialogueBox);
      if (!dialogueBox) {
        return;
      }

      if (dialogueIndex < dialogueQueue.length) {
        dialogueBox.classList.add("active");
        const dialogueText = dialogueBox.querySelector("#dialogue-text");
        const choicesContainer =
          dialogueBox.querySelector("#choices-container");

        dialogueText.innerText = dialogueQueue[dialogueIndex].text;

        choicesContainer.innerHTML = "";

        if (dialogueQueue[dialogueIndex].choices) {
          for (const choice of dialogueQueue[dialogueIndex].choices) {
            const choiceButton = document.createElement("button");
            choiceButton.innerText = choice.text;
            choiceButton.addEventListener("click", (event) => {
              event.stopPropagation();
              if (choice.action) {
                const actionResult = choice.action();
                if (actionResult && actionResult.newDialogue) {
                  dialogueQueue[dialogueIndex + 1] = actionResult.newDialogue;
                }
              }
              dialogueIndex++;
              updateDialogue(onComplete);
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
        if (onComplete) {
          onComplete(); // Resolve the promise when the dialogue is completed
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
      updateDialogue(resolve);
    };

    showDialogue(dialogue, appendToContainer, resolve);
  });
};

export { showDialogueAsync };
