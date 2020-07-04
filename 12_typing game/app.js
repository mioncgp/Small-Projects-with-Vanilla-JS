const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// Focus on text on start
text.focus();

// array of words
const arrWords = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

// Difficulty value
let diffficulty =
  localStorage.getItem("difficulty") != null
    ? localStorage.getItem("difficulty")
    : "medium";

// Set difficulty
difficultySelect.value =
  localStorage.getItem("difficulty") != null
    ? localStorage.getItem("difficulty")
    : "medium";

// Init random
let randomWord;

// game's score
let score = 0;

// init time
let time = 10;

// Update time every second
const timeInerval = setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord() {
  return arrWords[Math.floor(Math.random() * arrWords.length)];
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// update Score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
  time--;
  timeEl.innerHTML = `${time}s`;
  if (time === 0) {
    clearInterval(timeInerval);
    // end game
    gameOver();
  }
}

// game over
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>`;
  endgameEl.style.display = "flex";
}

addWordToDOM();

// Event lisner
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    e.target.value = "";
    if (diffficulty === "hard") {
      time += 2;
    } else if (diffficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }
    // updateTime();
  }
});

// toggle
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// Settings select
settingsForm.addEventListener("change", (e) => {
  diffficulty = e.target.value;
  localStorage.setItem("difficulty", diffficulty);
});
