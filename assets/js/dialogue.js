const generateDialogue = () => {
  const dialogQueue = [];
  let dialogIndex = 0;

  const showDialog = (dialogue) => {
    dialogQueue = dialogue;
    dialogIndex = 0;
    updateDialog();
  };

  const updateDialog = () => {
    const dialogBox = document.getElementById("dialogue-box");
    const dialogText = document.getElementById("dialogue-text");
    const choicesContainer = document.getElementById("choices-container");

    if (dialogIndex < dialogQueue.length) {
      dialogBox.classList.add("active");
      dialogText.innerText = dialogQueue[dialogIndex].text;

      choicesContainer.innerHTML = ""; // Clear previous choices
      if (dialogQueue[dialogIndex].choices) {
        for (const choice of dialogQueue[dialogIndex].choices) {
          const choiceButton = document.createElement("button");
          choiceButton.innerText = choice.text;
          choiceButton.addEventListener("click", () => {
            if (choice.action) choice.action();
            dialogIndex++;
            updateDialog();
          });
          choicesContainer.appendChild(choiceButton);
        }
      } else {
        window.addEventListener("click", continueDialog);
        window.addEventListener("keypress", continueDialog);
      }
    } else {
      dialogBox.classList.remove("active"); // Hide dialogue when finished
    }
  };

  const continueDialog = () => {
    dialogIndex++;
    updateDialog();
    window.removeEventListener("click", continueDialog);
    window.removeEventListener("keypress", continueDialog);
  };
};

export { generateDialogue };
// Example usage:
const dialogue = [
  { text: "Hello, welcome to the haunted mansion." },
  {
    text: "Do you want to enter?",
    choices: [
      { text: "Yes", action: () => console.log("Entering mansion...") },
      { text: "No", action: () => console.log("Leaving mansion...") },
    ],
  },
  { text: "You've entered the mansion." },
  // ... more dialogue
];

showDialog(dialogue);
