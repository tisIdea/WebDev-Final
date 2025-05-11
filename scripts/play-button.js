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
  let currentPlayingButton = null; // Keep track of which button initiated playback

  playButtons.forEach(playButton => {
    playButton.addEventListener("click", () => {
      const buttonId = playButton.getAttribute("id");

      if (buttonId && audioFiles.hasOwnProperty(buttonId)) {
        const audioPath = audioFiles[buttonId];

        // Check if the clicked button is the one currently playing
        if (currentAudioElement && currentPlayingButton === playButton) {
          // If playing, pause the audio and reset the button text
          currentAudioElement.pause();
          playButton.textContent = "▶"; // Change to play symbol
          currentAudioElement = null;
          currentPlayingButton = null;
        } else {
          // If not playing or a different button was clicked:
          // 1. Pause any currently playing audio
          if (currentAudioElement) {
            currentAudioElement.pause();
            // Reset the button text of the previously playing button
            if (currentPlayingButton) {
              currentPlayingButton.textContent = "▶";
            }
          }

          // 2. Play the new audio
          currentAudioElement = new Audio(audioPath);
          currentAudioElement.play();
          currentPlayingButton = playButton; // Set the current playing button

          // 3. Change the clicked button text to pause symbol
          playButton.textContent = "⏹"; // Change to stop symbol

          // Optional: Add an event listener to reset the button when the audio finishes
          currentAudioElement.onended = () => {
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