const image_comp = document.querySelectorAll(".image-ingame");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

const images_compare = {
  image1: "assets/images/card_back.png",
  image2: "assets/images/death_color.png",
  image3: "assets/images/justice_color.png",
  image4: "assets/images/the_fool_color.png",
  image5: "assets/images/the_hanged_man_color.png",
  image6: "assets/images/the_hermit_color.png",
  image7: "assets/images/the_moon_color.png",
};

let score = 0;
let timeLeft = 60; // 60 seconds
let number_test = 0;
nextImage();

function nextImage() {
  number_test++;
  if (number_test >= Object.keys(images_compare).length) {
    // alert(`Game over! Your final score is: ${score}`);
    game_over();
  } else {
    random_number = Math.floor(Math.random() * 4) + 1;
    let temp = 0;
    image_comp.forEach((imageActual) => {
      temp++;
      if (random_number == temp) {
        // newname = images_compare[`image${number_test}`];
        // newname = newname.replace(".png", "-dif.png");

        // console.log(newname);
        // imageActual.src = "../" + newname;
        imageActual.src = "../" + images_compare[`image${number_test}`];
        imageActual.classList.add("image-diff");
      } else {
        imageActual.src = "../" + images_compare[`image${number_test}`];
        imageActual.classList.remove("image-diff");
      }

      console.log(
        number_test,
        Object.keys(images_compare).length,
        imageActual.src
      );
      // imageActual.classList.add("image-diff");
    });
  }
}

image_comp.forEach((imageActual) => {
  imageActual.addEventListener("click", () => {
    if (imageActual.classList.contains("image-diff")) {
      // alert("You found a difference!");
      score++;
      scoreElement.textContent = `Score: ${score}`;
    } else {
      // alert("You clicked on the image!");
    }
    nextImage();
  });
});

function game_over() {
  // alert(`Game over! Your final score is: ${score}`);
  timerElement.textContent = `Game over! Your final score is: ${score}`;
  clearInterval(timerInterval);
  image_comp.forEach((imageActual) => {
    imageActual.removeEventListener("click", () => {});
  });
}

function updateTimer() {
  timeLeft--;
  timerElement.textContent = `Time Left: ${timeLeft}`;

  if (timeLeft === 0) {
    // alert(`Game over! Your final score is: ${score}`);
    game_over();
  }
}

function initGame() {
  const gameSpotElement = document.getElementById("game-spot");
  gameSpotElement.style.display = "block";
  timerInterval = setInterval(updateTimer, 1000);
}

initGame();
