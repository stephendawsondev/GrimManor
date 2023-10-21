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
