const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];

// to enable items to move
let dragStartIndex;

//store items
const listItems = [];

createList();

function createList() {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement("li");

      listItem.setAttribute("data-index", index);

      listItem.innerHTML = `
    <span class="number">${index + 1}</span>
    <div class="draggable" draggable="true">
      <p class="person-name">${person}</p>
      <i class="fas fa-grip-lines"></i>
    </div>`;

      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  // console.log(("event:", "dragStart"));
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragOver(e) {
  // console.log("event:", "dragOver");
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

function dragEnter() {
  // console.log("event:", "dragEnter");
  this.classList.add("over");
}

function dragLeave() {
  // console.log("event:", "dragLeave");
  this.classList.remove("over");
}

// swap items
function swapItems(startIndex, endIndex) {
  const itemOne = listItems[startIndex].querySelector(".draggable");
  const itemTwo = listItems[endIndex].querySelector(".draggable");

  listItems[startIndex].appendChild(itemTwo);
  listItems[endIndex].appendChild(itemOne);
}

// event listeners
function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((dragListItem) => {
    dragListItem.addEventListener("dragover", dragOver);
    dragListItem.addEventListener("drop", dragDrop);
    dragListItem.addEventListener("dragenter", dragEnter);
    dragListItem.addEventListener("dragleave", dragLeave);
  });
}
