const addUser = document.getElementById("add-user");
const double = document.getElementById("double");
const showMillionaires = document.getElementById("show-millionaires");
const sort = document.getElementById("sort");
const calculateWealth = document.getElementById("calculate-wealth");
const main = document.getElementById("main");

let data = [];

// get the data from the api and create a new user
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

// double money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDom();
}

// sort By Richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDom();
}

// filter
function showMillionairesOnly() {
  data = data.filter((user) => {
    return user.money > 1000000;
  });

  updateDom();
}

// whole sum
function calculateWealthOnly() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong> ${formatMoney(
    wealth
  )}</strong>`;
  main.appendChild(wealthEl);
}

// push an object to the data
function addData(obj) {
  data.push(obj);
  updateDom();
}

// update dom elements
function updateDom(providedData = data) {
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;
  data.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong>
    ${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}

// format number to money
function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// event listeners
addUser.addEventListener("click", getRandomUser);
double.addEventListener("click", doubleMoney);
sort.addEventListener("click", sortByRichest);
showMillionaires.addEventListener("click", showMillionairesOnly);
calculateWealth.addEventListener("click", calculateWealthOnly);
