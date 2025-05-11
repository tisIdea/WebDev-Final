const playButtons = document.querySelectorAll(".play-button");
const audioFiles = {
  "play-mkgee": "/audio/mkgee.mp3",
  "play-tyler": "/audio/tyler.wav",
  "play-steve-lacy": "/audio/stevelacy.mp3",
  "play-clairo": "/audio/clairo.wav",
  "play-dijon": "/audio/dijon.wav",
  "play-earfquake": "/audio/earfquake.mp3",
  "play-newmagicwand": "/audio/newmagicwand.mp3",
  "play-dark-red": "/audio/Dark_Red.mp3",
  "play-lo-que-siento": "/audio/cuco-loquesiento.mp3",
  "play-carino": "/audio/themarias-carino.wav",
  "play-simevoy": "/audio/cuco-simevoy.mp3",
};

let currentAudioElement = null;
let currentPlayingButton = null;
let timeoutId = null; // Timeout for 30-second limit

playButtons.forEach(playButton => {
  playButton.addEventListener("click", () => {
    const buttonId = playButton.getAttribute("id");

    if (buttonId && audioFiles.hasOwnProperty(buttonId)) {
      const audioPath = audioFiles[buttonId];

      // If clicked button is already playing
      if (currentAudioElement && currentPlayingButton === playButton) {
        currentAudioElement.pause();
        clearTimeout(timeoutId);
        playButton.textContent = "▶";
        currentAudioElement = null;
        currentPlayingButton = null;
      } else {
        if (currentAudioElement) {
          currentAudioElement.pause();
          clearTimeout(timeoutId);
          if (currentPlayingButton) {
            currentPlayingButton.textContent = "▶";
          }
        }

        currentAudioElement = new Audio(audioPath);
        currentAudioElement.play();
        currentPlayingButton = playButton;
        playButton.textContent = "⏹";

        // Set timeout to stop playback after 30 seconds
        timeoutId = setTimeout(() => {
          if (currentAudioElement) {
            currentAudioElement.pause();
            playButton.textContent = "▶";
            currentAudioElement = null;
            currentPlayingButton = null;
          }
        }, 30000); // 30 seconds

        currentAudioElement.onended = () => {
          clearTimeout(timeoutId);
          playButton.textContent = "▶";
          currentAudioElement = null;
          currentPlayingButton = null;
        };
      }
    } else {
      console.warn(`No audio file associated with id: ${buttonId}`);
    }
  });
});
