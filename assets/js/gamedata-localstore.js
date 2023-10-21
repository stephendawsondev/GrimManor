// Function to save player data to LocalStorage
function savePlayerData(playerName, score, gamesPlayed) {
  // Create an object with player data
  const playerData = {
    playerName: playerName,
    firstTimePlaying: true,
    storyComplete: false,
    hangmanClueObtained: false,
    memoryClueObtained: false,
    quizClueObtained: false,
    backDoorOpened: true,
  };

  // Convert the object to a JSON string
  const playerDataJSON = JSON.stringify(playerData);

  // Store the JSON string in LocalStorage
  localStorage.setItem("playerData", playerDataJSON);
}

// Function to load player data from LocalStorage
function loadPlayerData() {
  // Get the JSON string from LocalStorage
  const playerDataJSON = localStorage.getItem("playerData");

  // If there is saved data, parse it back into an object
  if (playerDataJSON) {
    const playerData = JSON.parse(playerDataJSON);
    return playerData;
  } else {
    return null; // No player data found in LocalStorage
  }
}

// Example usage within your game code:

// Import the GameDataLibrary.js in your game script
// Example usage:
// const playerName = "Adams";
// const playerScore = 1000;
// const gamesPlayed = 5;

// // Save player data
// savePlayerData(playerName, playerScore, gamesPlayed);

// // Load player data later
// const loadedPlayerData = loadPlayerData();

if (loadPlayerData()) {
  console.log("Player Name: " + loadedPlayerData.playerName);
  console.log("Score: " + loadedPlayerData.score);
  console.log("Games Played: " + loadedPlayerData.gamesPlayed);
} else {
  console.log("No player data found.");
}
