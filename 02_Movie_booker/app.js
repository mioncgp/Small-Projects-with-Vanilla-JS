const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupid)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = parseInt(movieSelect.value);

// set index of a movie and price to local storage
setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
};

// updates seleted items and their sum
updateSelectedItems = () => {
  const selectedItems = document.querySelectorAll(".seat.selected");
  const selectedItemsCount = selectedItems.length;

  const seatsIndex = [...selectedItems].map((seat) => {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("selectedItems", JSON.stringify(seatsIndex));

  count.innerText = selectedItemsCount;
  total.innerHTML = selectedItemsCount * ticketPrice;
};

// event listeners
movieSelect.addEventListener("change", (e) => {
  ticketPrice = e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedItems();
});

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedItems();
  }
});

// 1. Adding an event lisnener on the container because it is more performant
// 2. Check if seats do not contain "occupied" then toggle them by adding a class3
// 3. Create a func that has all the items that has the class "selected"
// 4  Check the length, so you will have the amount of selected items,
// 5. multiply it by ticket price and you'll get the sum
// 6. Create also event listener on selected list and call update func inside it, so your data updates according to the movie price
// 7. iterate over selected elements and check them again all the elements and return the indexes of seleted in a new array
// 8. store the array of indexes in the localstorage
// 9. create a func which accepts an index and a value and send the value of movie and the index to LS
