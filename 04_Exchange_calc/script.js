const currency_one = document.getElementById("currency-one");
const currency_two = document.getElementById("currency-two");
const amount_one = document.getElementById("amount-one");
const amount_two = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// Fetch exchange rate and update the dom
function calculate() {
  const currencyValueOne = currency_one.value;
  const currencyValueTwo = currency_two.value;
  fetch(`https://api.exchangeratesapi.io/latest?base=${currencyValueOne}`).then(
    (res) =>
      res.json().then((data) => {
        const rate = data.rates[currencyValueTwo];
        rateEl.innerHTML = `1 ${currencyValueOne} = ${rate} ${currencyValueTwo}`;

        amount_two.value = (amount_one.value * rate).toFixed(2);
      })
  );
}

// event listeners
currency_one.addEventListener("change", calculate);
amount_one.addEventListener("input", calculate);
currency_two.addEventListener("change", calculate);
amount_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currency_one.value;
  currency_one.value = currency_two.value;
  currency_two.value = temp;
  calculate();
});

calculate();
