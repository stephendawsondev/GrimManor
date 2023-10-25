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

let url_audios_deploy = "../..";

if (currentPath.includes("github.io")) {
  url_audios_deploy = "https://stephendawsondev.github.io/GrimManor";
}

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
const loadAudio = () => {
  const audioObjects = {};

  for (const [key, fileName] of Object.entries(audioFiles)) {
    audioObjects[key] = new Audio(
      `${url_audios_deploy}/assets/audio/${fileName}`
    );
  }

  return audioObjects;
};

const addAudioIconEventListeners = () => {
  const musicButton = document.getElementById("music-button");
  const soundButton = document.getElementById("sound-button");
  const musicIcon = document.getElementById("music-icon");
  const soundIcon = document.getElementById("sound-icon");

  musicButton.addEventListener("click", () => {
    userAllowsMusic = !userAllowsMusic;
    let loadedPlayerData = loadPlayerData();
    savePlayerData({ ...loadedPlayerData, playerAllowsMusic: userAllowsMusic });
    if (userAllowsMusic) {
      musicIcon.src = `${url_audios_deploy}/assets/images/music_on.webp`;
    } else {
      musicIcon.src = `${url_audios_deploy}/assets/images/music_off.webp`;
    }
  });

  soundButton.addEventListener("click", () => {
    userAllowsSounds = !userAllowsSounds;
    let loadedPlayerData = loadPlayerData();
    savePlayerData({
      ...loadedPlayerData,
      playerAllowsSound: userAllowsSounds,
    });
    if (userAllowsSounds) {
      soundIcon.src = `${url_audios_deploy}/assets/images/sound_on.webp`;
    } else {
      soundIcon.src = `${url_audios_deploy}/assets/images/sound_off.webp`;
    }
  });
};

export {
  userAllowsMusic,
  userAllowsSounds,
  loadAudio,
  addAudioIconEventListeners,
};
