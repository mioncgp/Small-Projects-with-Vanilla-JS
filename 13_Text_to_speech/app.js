const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

// data to upload images and messages
const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

// iterate through the objects and on each iteration call func
data.forEach(createBox);

// Create speech boxes
function createBox(item) {
  // create element
  const box = document.createElement("div");
  // destructure the values
  const { image, text } = item;

  box.classList.add("box");

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;
  // when clicked say the text
  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    box.classList.add("active");
    setTimeout(() => {
      box.classList.remove("active");
    }, 1000);
  });
  //   add boxes to the DOM
  main.appendChild(box);
}

// init the speech synthesis
const message = new SpeechSynthesisUtterance();

// show all the possible voices to select from
function getVoices() {
  // create an array from the API
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// pass the text to the initalized text class
function setTextMessage(text) {
  message.text = text;
}

// speak the text
function speakText() {
  speechSynthesis.speak(message);
}

// iterate through the voices and seleced one
function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

// read the text in the textarea
function readText() {
  setTextMessage(textarea.value);
  speakText();
}

// if the voices is chaned get them again
speechSynthesis.addEventListener("voiceschanged", getVoices);

// show show or hide the text box
toggleBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.toggle("show")
);

// remove the tex box
closeBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.remove("show")
);

// when clicked read the text
readBtn.addEventListener("click", readText);

// when cliked set the selected voice to speak
voicesSelect.addEventListener("change", setVoice);

getVoices();
