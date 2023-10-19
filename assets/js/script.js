// jshint esversion: 6

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
const miniGame1 = () => window.location.href = "game1.html";

// This function displays the second mini game
const miniGame2 = () => window.location.href = "game2.html";

// This function displays the third mini game
const miniGame3 = () => window.location.href = "game3.html";