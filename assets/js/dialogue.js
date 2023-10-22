let dialogueQueue = [];
let dialogueIndex = 0;

const showDialogueAsync = (dialogue, appendToContainer = false) => {
  return new Promise((resolve) => {
    const parentElement = appendToContainer
      ? document.getElementById("game-container")
      : document.body;

    let dialogueBox = parentElement.querySelector("#dialogue-box");

    if (!dialogueBox) {
      dialogueBox = document.createElement("div");
      dialogueBox.id = "dialogue-box";
      dialogueBox.classList.add("dialogue-box");
      let dialogueText = document.createElement("p");
      dialogueText.id = "dialogue-text";
      dialogueBox.appendChild(dialogueText);
      let choicesContainer = document.createElement("div");
      choicesContainer.id = "choices-container";
      dialogueBox.appendChild(choicesContainer);
      parentElement.appendChild(dialogueBox);
    }

    dialogueQueue = dialogue;
    dialogueIndex = 0;

    let isDialogueReady = false;
    const updateDialogue = () => {
      isDialogueReady = false;
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
              // your existing code
              if (choice.action) {
                const actionResult = choice.action();
                if (actionResult && actionResult.newDialogue) {
                  dialogueQueue.splice(
                    dialogueIndex + 1,
                    0,
                    actionResult.newDialogue
                  );
                }
              }
              dialogueIndex++;
              updateDialogue();
            });
            choicesContainer.appendChild(choiceButton);
          }
        }
        setTimeout(() => {
          isDialogueReady = true;
          window.addEventListener("click", continueDialogue, { once: true });
        }, 0);
      } else {
        dialogueBox.classList.remove("active");
        resolve();
      }
    };

    const continueDialogue = () => {
      if (isDialogueReady) {
        // Check if dialogue is ready
        dialogueIndex++;
        updateDialogue();
      }
    };

    updateDialogue();
  });
};

export { showDialogueAsync };
