// Function to save player data to LocalStorage
function savePlayerData(playerName, score, gamesPlayed) {
  // Create an object with player data
  const playerData = {
    playerName: playerName,
    score: score,
    gamesPlayed: gamesPlayed,
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
