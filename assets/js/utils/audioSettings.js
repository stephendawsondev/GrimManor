import { savePlayerData, loadPlayerData } from "./gamedataLocalstore.js";

const currentPath = window.location.pathname;

const audioFiles = {
  classicScare: "classic-scare.mp3",
  ghostScream: "ghost-scream.mp3",
  highPitchedScream: "high-pitched-scream.mp3",
  spookyGhostWind: "spooky-ghost-wind.mp3",
  stairs: "stairs.mp3",
  thunderstorm: "thunderstorm.mp3",
  windAndDread: "wind-and-dread.mp3",
  darkAmbientMusic: "dark-ambient-music.mp3",
  door: "door.mp3",
  creepyWhistlyMusic: "creepy-whistly-music.mp3",
};

let userAllowsSounds, userAllowsMusic;

const loadPlayerSettings = () => {
  const loadedData = loadPlayerData();
  if (loadedData) {
    userAllowsSounds = loadedData.playerAllowsSound;
    userAllowsMusic = loadedData.playerAllowsMusic;
  }

  if (userAllowsMusic && userAllowsSounds) {
    loadPlayerSettings();
  }
};

/**
 * Loads the audio files
 * @returns {Object} audioObjects
 */
const loadAudio = (url) => {
  const audioObjects = {};

  for (const [key, fileName] of Object.entries(audioFiles)) {
    audioObjects[key] = new Audio(`${url}/assets/audio/${fileName}`);
  }

  return audioObjects;
};

const addAudioIconEventListeners = () => {
  // Load initial states from local storage
  const loadedPlayerData = loadPlayerData();
  userAllowsMusic = loadedPlayerData.playerAllowsMusic;
  userAllowsSounds = loadedPlayerData.playerAllowsSound;

  // Update icons based on initial state
  const musicIcon = document.getElementById("music-icon");
  const soundIcon = document.getElementById("sound-icon");
  musicIcon.src = userAllowsMusic
    ? `assets/images/music_on.webp`
    : `assets/images/music_off.webp`;
  soundIcon.src = userAllowsSounds
    ? `assets/images/sound_on.webp`
    : `assets/images/sound_off.webp`;

  // Add event listeners
  const musicButton = document.getElementById("music-button");
  const soundButton = document.getElementById("sound-button");

  musicButton.addEventListener("click", (event) => {
    event.stopPropagation();
    userAllowsMusic = !userAllowsMusic;
    savePlayerData({ ...loadedPlayerData, playerAllowsMusic: userAllowsMusic });
    musicIcon.src = userAllowsMusic
      ? `assets/images/music_on.webp`
      : `assets/images/music_off.webp`;
  });

  soundButton.addEventListener("click", () => {
    userAllowsSounds = !userAllowsSounds;
    savePlayerData({
      ...loadedPlayerData,
      playerAllowsSound: userAllowsSounds,
    });
    soundIcon.src = userAllowsSounds
      ? `assets/images/sound_on.webp`
      : `assets/images/sound_off.webp`;
  });
};

export {
  userAllowsMusic,
  userAllowsSounds,
  loadAudio,
  addAudioIconEventListeners,
};
