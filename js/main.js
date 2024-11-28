/*----- constants -----*/
const countdownAudio = new Audio(
  "https://cdn.pixabay.com/audio/2022/11/05/audio_997c8fe344.mp3"
);
/*----- state variables -----*/
let compSequence;
let playerSequence;
let turn;
let running;
let level;

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

function playSequence() {
  //after countdown simon plays random sequence
  //while he plays his sequence the buttons are unclickable
}

function handleClick(event) {
  const padIdx = padEls.indexOf(event.target);

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
    }
  }, 1000);
}

function renderLevel() {
  const levelEl = document.getElementById("level");
  levelEl.innerText = level;
}
