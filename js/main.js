/*----- constants -----*/
const countdownAudio = new Audio(
  "https://cdn.pixabay.com/audio/2022/11/05/audio_997c8fe344.mp3"
);

const pIndexes = [0, 1, 2, 3];
/*----- state variables -----*/
let compSequence;
let playerSequence;
let turn;
let running;
let level;
let sequenceLength = 4;

/*----- cached elements  -----*/
const playButton = document.getElementById("play-btn");
const padEls = [...document.getElementsByClassName("pad")];
const resetBtnEl = document.getElementById("reset");
const countdownEl = document.getElementsByClassName("countdown");
/*----- event listeners -----*/

padEls.forEach(function (padEl) {
  padEl.addEventListener("click", handleClick);
});

playButton.addEventListener("click", renderCountdown);

/*----- functions -----*/
init();

function init() {
  level = 1;
  running = false;
  turn = "Simon";
  compSequence = [];
  playerSequence = [];
  render();
}

function render() {
  renderLevel();
  //   renderCountdown();
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playSequence() {
  for (let i = 0; i < sequenceLength; i++) {
    compSequence[i] = pIndexes[getRandomInt(0, 3)];
  }
  for (let idx in compSequence) {
    padEls[idx].style.opacity = 1;
    setTimeout(function () {
      padEls[idx].style.opacity = 0.7;
    }, 250);
  }
}

function handleClick(event) {
  const padIdx = padEls.indexOf(event.target);
  if (turn !== "Simon") {
    padEls[padIdx].style.opacity = 1;
    setTimeout(function () {
      padEls[padIdx].style.opacity = 0.7;
    }, 300);
  }

  //   console.log(playButtonIdx);
  console.log(padIdx);
}

function renderCountdown() {
  let count = 3;
  countdownAudio.currentTime = 0;
  countdownAudio.play();
  playButton.style.visibility = "visible";
  playButton.innerText = count;
  const timerId = setInterval(function () {
    count--;
    if (count) {
      playButton.innerText = count;
    } else {
      clearInterval(timerId);
      playButton.innerText = "";
      playSequence();
    }
  }, 1000);
}

function renderLevel() {
  const levelEl = document.getElementById("level");
  levelEl.innerText = level;
}
