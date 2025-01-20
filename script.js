const dynamicDiv = document.getElementById("dynamic-div");
const nameInput = document.getElementById("name-input");
const descriptionInput = document.getElementById("description-input");
const addBtn = document.getElementById("add-button");
const scrapBtn = document.getElementById("scrap-button");
const incompleteList = document.getElementById("incomplete-list");
const completeList = document.getElementById("complete-list");
const completeCheck = document.getElementsByClassName("complete-check");

let incompleteToDos = [];
let completeToDos = [];

class ToDo {
  constructor(name, description, isComplete = false, deadline = null) {
    this.name = name;
    this.description = description;
    this.isComplete = isComplete;
    this.deadline = deadline;
  }
  addEventListeners() {
    addBtn.addEventListener("click", (event) => {
      event.preventDefault();
      this.addToDo();
    });
    nameInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.addToDo();
      }
    });
    descriptionInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.addToDo();
      }
    });
  }

  addToDo() {
    if (nameInput.value) {
      incompleteToDos.push(new ToDo(nameInput.value, descriptionInput.value));
      nameInput.value = "";
      descriptionInput.value = "";

      renderToDos(incompleteToDos);
    } else {
      alert("Please provide a valid task name.");
    }
  }
}

const addNewToDo = new ToDo();
addNewToDo.addEventListeners();

incompleteList.addEventListener("click", (event) => {
  if (event.target.matches(".complete-check")) {
    const li = event.target.closest("li");
    locateToDo(event);
  }
});

function locateToDo(event) {
  const checkedBox = event.target;
  const index = checkedBox.dataset.index;
  const todo = incompleteToDos[index];
  todo.isComplete = true;
  completeToDos.push(incompleteToDos.splice(index, 1)[0]);
  renderCompletedToDos();
  renderToDos();
}

function renderToDos() {
  incompleteList.innerHTML = "";
  for (let i = 0; i < incompleteToDos.length; i++) {
    let li = document.createElement("li");
    if (incompleteToDos[i].description === "") {
      li.innerHTML = `ToDo Name: ${incompleteToDos[i].name} <input type="checkbox" class="complete-check" data-index="${i}">`;
    } else {
      li.innerHTML = `ToDo Name: ${incompleteToDos[i].name} <input type="checkbox" class="complete-check" data-index="${i}"><br>
                    ToDo Description: ${incompleteToDos[i].description}`;
    }
    incompleteList.appendChild(li);
  }
}

function renderCompletedToDos() {
  completeList.innerHTML = "";
  for (let i = 0; i < completeToDos.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = `Completed ${completeToDos[i].name} at date/time`;
    completeList.appendChild(li);
  }
}
