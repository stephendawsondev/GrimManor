// Get the viewport width and height
const vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);
const vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0
);

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const isDesktop = !isMobile;

const isPortrait = window.matchMedia("(orientation: portrait)").matches;
const isLandscape = window.matchMedia("(orientation: landscape)").matches;

const isSmall = vw < 768;
const isMedium = vw >= 768 && vw < 992;
const isLarge = vw >= 992 && vw < 1200;
const isExtraLarge = vw >= 1200;

const isSmallAndPortrait = isSmall && isPortrait;
const isMediumAndPortrait = isMedium && isPortrait;
const isLargeAndPortrait = isLarge && isPortrait;
const isExtraLargeAndPortrait = isExtraLarge && isPortrait;

const imagePath = "assets/images/scary-mansion.png";

// Set the background image to cover the viewport on desktop
if (vw >= 768) {
  document.body.style.backgroundImage = "url(" + imagePath + ")";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center center";
  document.body.style.backgroundAttachment = "fixed";
} else {
  // Set the background image to fit the viewport on mobile
  document.body.style.backgroundImage = "url(" + imagePath + ")";
  document.body.style.backgroundSize = "300%";

  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center center";

  // Add touch event listeners to allow scrolling on mobile
  let startingX;
  let startingY;
  let movingX;
  let movingY;

  document.body.addEventListener("touchstart", function (e) {
    console.log("touchstart");
    startingX = e.touches[0].clientX;
    startingY = e.touches[0].clientY;
  });

  document.body.addEventListener("touchmove", function (e) {
    console.log("touchmove");
    movingX = e.touches[0].clientX;
    movingY = e.touches[0].clientY;
    window.scrollBy(startingX - movingX, startingY - movingY);
    startingX = movingX;
    startingY = movingY;
  });

  // add click event listener to move the image
  document.body.addEventListener("click", function (e) {
    console.log("click");
    // Get the x and y coordinates of the click
    const x = e.clientX;
    const y = e.clientY;

    // Move the image to the x and y coordinates of the click
    const image = document.getElementById("scary-mansion");
    image.style.left = x + "px";
    image.style.top = y + "px";
  });
}
