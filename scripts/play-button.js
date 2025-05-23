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
  "play-alesis": "/audio/alesis.mp3",
  "play-letithappen": "/audio/letithappen.mp3",
  "play-rare": "/audio/rare.mp3",
  "play-early": "/audio/early-eyes.mp3",
  "play-noonenoticed": "/audio/themarias-noone.mp3",
  "play-rem": "/audio/rem-imitation.mp3",
  "play-care": "/audio/care.mp3",
  "play-coffee": "/audio/Coffee.mp3",
  "play-if-u-want-to": "/audio/If_You_Want_To.mp3",
  "play-she-plays-bass": "/audio/sheplaysbass.mp3",
  "play-the-perfect-pair": "/audio/the_perfect_pair.mp3",
  "play-eventually": "/audio/eventually.mp3",
  "play-yes-im-changing": "/audio/yes-im-changing.mp3",

};

let currentAudioElement = null;
let currentPlayingButton = null;
let timeoutId = null; 

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
