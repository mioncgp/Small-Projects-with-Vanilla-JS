const container = document.getElementById("container");
const text = document.getElementById("text");

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

breathAnimation();

function breathAnimation() {
  // breateh in
  container.classList.add("grow");
  text.innerText = `Breathe In`;
  container.className = "container grow";

  // hold breath
  setTimeout(() => {
    text.innerText = `Hold`;

    // breathe out
    setTimeout(() => {
      text.innerText = `Breathe Out`;
      container.className = "container shrink";
    }, holdTime);
  }, breatheTime);
}

setInterval(breathAnimation, totalTime);
