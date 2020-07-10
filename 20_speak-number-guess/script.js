const msgEl = document.getElementById("msg");

const randomNum = getRandomNum();

console.log(randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();

// capture the transcript
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkMessage(msg);
}

// display the message
function writeMessage(msg) {
  msgEl.innerHTML = `
  <div> You said: </div>
  <span class="box">${msg}</span>`;
}

// check the number
function checkMessage(msg) {
  const num = +msg;

  // check if the number is valid
  if (Number.isNaN(num)) {
    msgEl.innerHTML += `
    <div> That is not a valid number</div>`;
    return;
  }

  // the if the number is guessed
  if (num === randomNum) {
    msgEl.innerHTML = `
    <h2> Congrats you won!</h2>
    <div> The number was ${num}</div>
    <button id="play-again" class="play-again">Play Again</button>`;
  } else if (num > randomNum) {
    msgEl.innerHTML += `
    <div>Go lower</div>`;
  } else if (num < randomNum) {
    msgEl.innerHTML += `
    <div> Go higher</div>`;
  }
}

// generate random num
function getRandomNum() {
  return Math.floor(Math.random() * 100) + 1;
}

// listen
recognition.addEventListener("result", onSpeak);
// listen on repeat
recognition.addEventListener("end", recognition.start);
// play again button
document.body.addEventListener("click", (e) => {
  if (e.target.id === "play-again") {
    window.location.reload();
  }
});
