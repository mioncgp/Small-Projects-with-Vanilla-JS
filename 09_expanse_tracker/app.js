const balance = document.querySelector("#balance"),
  income = document.querySelector("#money-plus"),
  expense = document.querySelector("#money-minus"),
  history = document.querySelector("#list"),
  nameInput = document.querySelector("#text"),
  amountInput = document.querySelector("#amount"),
  button = document.querySelector(".btn");

let numPositive = 0;
let numNegative = 0;

//   check the inputs
function addItem(e) {
  // prevent default behavior
  e.preventDefault();
  if (nameInput.value === "" && amountInput.value === "") {
    alert("Please enter values");
  } else {
    addValues(nameInput.value, amountInput.value);
  }
}

//display and calculate values
function addValues(name, amount) {
  const numAmount = Number(amount);
  if (numAmount > 0) {
    numPositive += numAmount;
    income.innerHTML = `$${numPositive}`;
  } else {
    numNegative += numAmount;
    expense.innerHTML = `$${numNegative}`;
  }
  calcBalance(numPositive, numNegative);
  displayHistory(name, amount);
}

// calculate balance
function calcBalance(num1, num2) {
  const result = num1 + num2;
  balance.innerHTML = `$${result}`;
}

// display history
function displayHistory(name, amount) {
  let classDis = "";
  let sign = "";
  if (amount > 0) {
    classDis = "plus";
    sign = "+";
  } else {
    classDis = "minus";
  }
  history.innerHTML += `
    <li class="${classDis}">
    ${name} <span>${sign}${amount}</span><button class="delete-btn">x</button>
  </li>
    `;
}
// Event lisneters
button.addEventListener("click", addItem);
