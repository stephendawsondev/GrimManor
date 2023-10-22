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

    const updateDialogue = () => {
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
            choiceButton.addEventListener("click", () => {
              if (choice.action) {
                const actionResult = choice.action();
                if (actionResult && actionResult.newDialogue) {
                  dialogueQueue[dialogueIndex + 1] = actionResult.newDialogue;
                }
              }
              dialogueIndex++;
              updateDialogue();
            });
            choicesContainer.appendChild(choiceButton);
          }
        } else {
          window.addEventListener("click", continueDialogue, { once: true });
        }
      } else {
        dialogueBox.classList.remove("active");
        resolve();
      }
    };

    const continueDialogue = () => {
      dialogueIndex++;
      updateDialogue();
    };

    updateDialogue();
  });
};

export { showDialogueAsync };
