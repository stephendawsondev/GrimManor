// jshint esversion: 6
const backgroundImage = document.getElementById("background-image");
const moveButtons = document.querySelectorAll("button");
const container = document.getElementById("container");

moveButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const direction = event.target.id.replace("move-", "");
    moveBackground(direction);
  });
});

function moveBackground(direction) {
  let top = backgroundImage.offsetTop;
  let left = backgroundImage.offsetLeft;

  const step = 20; // Adjust this to change the speed of the movement
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  const imageWidth = backgroundImage.width;
  const imageHeight = backgroundImage.height;

  switch (direction) {
    case "up":
      top = Math.min(top + step, 0);
      break;
    case "down":
      top = Math.max(
        top - step,
        containerHeight + containerHeight / 5 - imageHeight
      );
      break;
    case "left":
      left = Math.min(left + step, 0);
      break;
    case "right":
      left = Math.max(
        left - step,
        containerWidth + containerWidth / 4 - imageWidth
      );
      break;
  }

  console.log(direction, top, left);
  console.log(
    containerHeight,
    imageHeight,
    top - step,
    containerHeight - imageHeight
  );
  //backgroundImage.style.top = top + "px";
  //backgroundImage.style.left = left + "px";
  backgroundImage.style.marginTop = top + "px";
  backgroundImage.style.marginLeft = left + "px";
}

// Get all button elements
const buttons = document.querySelectorAll("button");

/* This method loops through individual buttons
 *  and listens for a click event
 *  it then calls the displayMiniGames function
 *  and passes the id of the clicked button
 */
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    displayMiniGames(button.id);
  });
});

// This function displays the first mini game
const miniGame1 = () => (window.location.href = "game1.html");

// This function displays the second mini game
const miniGame2 = () => (window.location.href = "game2.html");

// This function displays the third mini game
const miniGame3 = () => (window.location.href = "game3.html");

/*This function finds the id of the clicked button
 * passed from the event listener
 * and calls the respective function
 * to displays the clicked mini game
 */
const displayMiniGames = (id) => {
  if (id == "mini-game1") {
    miniGame1();
  } else if (id == "mini-game2") {
    miniGame2();
  } else if (id == "mini-game3") {
    miniGame3();
  }
};
