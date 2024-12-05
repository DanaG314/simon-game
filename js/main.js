/*----- constants -----*/
const countdownAudio = new Audio(
  "https://cdn.pixabay.com/audio/2022/11/05/audio_997c8fe344.mp3"
);

const gameOverAudio = new Audio(
  "https://cdn.pixabay.com/audio/2024/08/07/audio_cba96c8800.mp3"
);

const roundCompleteSound = new Audio(
  "https://cdn.pixabay.com/audio/2022/03/10/audio_f96ec71310.mp3"
);

const padSounds = {
  0: new Audio("https://cdn.pixabay.com/audio/2024/01/11/audio_4f4a1ec3e0.mp3"),
  1: new Audio("https://cdn.pixabay.com/audio/2022/03/19/audio_b1e725b098.mp3"),
  2: new Audio("https://cdn.pixabay.com/audio/2023/01/01/audio_a178429b06.mp3"),
  3: new Audio("https://cdn.pixabay.com/audio/2024/01/11/audio_4b8960c6a0.mp3"),
};

/*----- state variables -----*/
let compSequence;
let playerSequence;
let turn;
let level;
let highscore = 0;
let sequenceLength;
let timerId; // countdown

/*----- cached elements  -----*/
const playButton = document.getElementById("play-btn");
const padEls = [...document.getElementsByClassName("pad")];
const resetBtnEl = document.getElementById("reset");
/*----- event listeners -----*/

// for each pad in the game, this attaches a click event listener
padEls.forEach((padEl) => padEl.addEventListener("click", handleClick)); // when pad is clicked the handleClick() func runs

playButton.addEventListener("click", startCountdown);

resetBtnEl.addEventListener("click", function () {
  init(); // resets game state
  clearInterval(timerId); // stops the countdown timer
  countdownAudio.pause(); // stops the countdown sound
  playButton.innerText = "START"; // changes button text back to "START"
  playButton.addEventListener("click", startCountdown); // re-enables the play button
});

/*----- functions -----*/
init();

function init() {
  // Initializes state of game
  level = 1;
  sequenceLength = 4;
  turn = "Simon";
  compSequence = [];
  playerSequence = [];
  playButton.style.color = "black";
  renderLevel();
}

function playSequence() {
  let currentStep = 0; // keeps track of which step simon is currently playing
  playButton.innerText = "Simons Turn";

  function highlightNextPad() {
    if (currentStep >= sequenceLength) {
      // if simon has played all steps
      turn = "player";
      playButton.innerText = "Your Turn!";
      return;
    }
    highlightPad(compSequence[currentStep]); // lights up the current pad
    currentStep++; // moves to next step in the sequence
    setTimeout(highlightNextPad, 1500); // waits 1.5 seconds before playing next pad
  } // highlightNextPad continues calling itself for each step of the sequence
  // until the condition is met. (recursive function, got help from MDN, stack overflow)
  setTimeout(highlightNextPad, 1000); // starts the sequence after 1 second
}

function highlightPad(index) {
  const sound = new Audio(padSounds[index].src);
  sound.play();
  sound.volume = 0.4;

  padEls[index].style.opacity = 1; // temporarily changes the pads opacity to show its lit
  setTimeout(function () {
    padEls[index].style.opacity = 0.7; // restores pads original opacity
  }, 350); // changes opacity back after 350 milliseconds
}

function handleClick(event) {
  const padIdx = padEls.indexOf(event.target); // finds which pad was clicked
  if (turn !== "Simon") {
    // only allows click during player's turn
    highlightPad(padIdx); // visually light up the pad the player clicked
    playerSequence.push(padIdx); // adds clicked pad to players sequence
    validateSequence(); // checks if players input is correct
  }
}

function validateSequence() {
  for (let i = 0; i < playerSequence.length; i++) {
    if (playerSequence[i] !== compSequence[i]) {
      // if sequences dont match
      playButton.innerText = "GAME OVER";
      gameOverAudio.play();
      gameOverAudio.volume = 0.4;
      renderHighscore(); // called to display current highscore
      playButton.style.animation = "none";
      playButton.offsetHeight; // triggers restart of animation
      playButton.style.animation = "blink 2s linear"; // applies blink animation
      playButton.style.color = "red"; // once the blink animation is done the text is turned red in gameover
      turn = "Simon";
      return; // exits if the game is over
    }
    if (playerSequence.length === sequenceLength) {
      // if player completes level
      level++; // increases the level
      renderHighscore(); // highscore is updated
      renderLevel(); // updates the level
      sequenceLength++; // increases the length of the sequence for the next round
      playerSequence = []; // resets the player's sequence for the next round
      compSequence.push(getRandomInt(0, 3)); // new random pad added
      playButton.innerText = "Next Round";
      roundCompleteSound.play(); // plays sound indicating success
      roundCompleteSound.volume = 0.4;
      setTimeout(playSequence, 2000); // starts the next round after 2 seconds
      turn = "Simon";
    }
  }
}

function getRandomInt(min, max) {
  // generate random int
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateFirstSequence() {
  //iterate over sequence length
  for (let i = 0; i < sequenceLength; i++) {
    compSequence.push(getRandomInt(0, 3)); // adds random numbers (0-3) to simons sequence
  }
}

function startCountdown() {
  // handles 3-second countdown before simon begins, updates play button text to show countdown and play sound
  playButton.removeEventListener("click", startCountdown, false); // disables play button during countdown
  let count = 3; // countdown starts at 3 seconds
  countdownAudio.currentTime = 0; // resets the audio to the begining
  countdownAudio.play(); // plays countdown sound
  countdownAudio.volume = 0.4;
  playButton.innerText = count; // shows current countdown number
  timerId = setInterval(function () {
    count--; // decreases the countdown by 1 each second
    if (count) {
      playButton.innerText = count; // updates the countdown on the button
    } else {
      clearInterval(timerId); // stops the countdown
      playButton.innerText = "Simons Turn"; // updates button to indicate "Simons" turn
      generateFirstSequence(); // generates randonm sequence for simon
      setTimeout(playSequence, 2000); // shows simons sequence after 2 seconds
    }
  }, 1000); // runs the inner function every 1 second
}

function renderHighscore() {
  const highscoreEl = document.getElementById("highscore");
  if (level > 1 && level > highscore) {
    // ensures game has advanced past the first level, and checks if the
    //player's current level is higher than stored highscore.
    highscore = level - 1; // updates highscore to the previous level
    //which is the lvl achieved by the player
    highscoreEl.innerText = highscore;
  }
}

function renderLevel() {
  const levelEl = document.getElementById("level");
  levelEl.innerText = level;
}
