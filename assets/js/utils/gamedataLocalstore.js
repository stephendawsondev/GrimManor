let keystore = "userData-halloween";

// Function to save player data to LocalStorage
function savePlayerData(playerData) {
  // Create an object with player data
  // const playerData = {
  //   playerName: playerName,
  //   firstTimePlaying: true,
  //   storyComplete: false,
  //   hangmanClueObtained: false,
  //   memoryClueObtained: false,
  //   quizClueObtained: false,
  //   backDoorOpened: false,
  // };

  // Convert the object to a JSON string
  const playerDataJSON = JSON.stringify(playerData);

  // Store the JSON string in LocalStorage
  localStorage.setItem(keystore, playerDataJSON);
}

// Function to load player data from LocalStorage
function loadPlayerData() {
  // Get the JSON string from LocalStorage
  const playerDataJSON = localStorage.getItem(keystore);

  // If there is saved data, parse it back into an object
  if (playerDataJSON) {
    const playerData = JSON.parse(playerDataJSON);
    return playerData;
  } else {
    //return null; // No player data found in LocalStorage
    return {
      playerName: "Adams",
      firstTimePlaying: true,
      landingPageComplete: false,
      storyComplete: false,
      hangmanClueObtained: false,
      memoryClueObtained: false,
      quizClueObtained: false,
      backDoorOpened: false,
      playerAllowsMusic: true,
      playerAllowsSound: true,
    };
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

const updateLocalProperty = (property, value) => {
  const currentData = loadPlayerData();
  savePlayerData({ ...currentData, [property]: value });
};

if (loadPlayerData()) {
  let loadedPlayerData = loadPlayerData();
  console.log("landingPageComplete: " + loadedPlayerData.landingPageComplete);
  console.log("hangmanClueObtained: " + loadedPlayerData.hangmanClueObtained);
  console.log("memoryClueObtained: " + loadedPlayerData.memoryClueObtained);
  console.log("quizClueObtained: " + loadedPlayerData.quizClueObtained);
  console.log("backDoorOpened: " + loadedPlayerData.backDoorOpened);
} else {
  console.log("No player data found.");
}

// let loadedPlayerData = loadPlayerData();
// let loadedPlayerData = loadPlayerData(); savePlayerData({ ...loadedPlayerData, hangmanClueObtained: true });
// let loadedPlayerData = loadPlayerData(); savePlayerData({ ...loadedPlayerData, memoryClueObtained: true });
// let loadedPlayerData = loadPlayerData(); savePlayerData({ ...loadedPlayerData, quizClueObtained: true });
// let loadedPlayerData = loadPlayerData(); savePlayerData({ ...loadedPlayerData, backDoorOpened: true });

// // Load player data later
let loadedPlayerData = loadPlayerData();

export { savePlayerData, loadPlayerData, updateLocalProperty };
