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
