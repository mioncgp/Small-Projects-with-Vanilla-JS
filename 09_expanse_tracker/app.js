const balance = document.querySelector("#balance"),
  money_plus = document.querySelector("#money-plus"),
  money_minus = document.querySelector("#money-minus"),
  list = document.querySelector("#list"),
  form = document.querySelector("#form"),
  text = document.querySelector("#text"),
  amount = document.querySelector("#amount"),
  button = document.querySelector(".btn");

// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
// ];

const localStorageTrans = JSON.parse(localStorage.getItem("transactions"));

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTrans : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    text.value = "";
    amount.value = "";
  }
}

// generate ID
function generateID() {
  return Math.floor(Math.random() * 10000000);
}

// Add transaction to DOM list
function addTransactionDOM(transaction) {
  // get sign
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
  ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>`;

  list.append(item);
}

// update income and expense
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item)).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => (acc += item) * -1)
    .toFixed(2);

  balance.innerHTML = `$${total}`;
  money_minus.innerHTML = `$${expense}`;
  money_plus.innerHTML = `$${income}`;
}

// remove transaction by id
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLS();
  init();
}
// Init app
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
  updateLS();
}

// update LS
function updateLS() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
init();

form.addEventListener("submit", addTransaction);
