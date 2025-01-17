const nameInput = document.getElementById("name-input");
const descriptionInput = document.getElementById("description-input");
const addBtn = document.getElementById("add-button");
const incompleteList = document.getElementById("incomplete-list");

let incompleteToDos = [];
let completeToDos = [];

class ToDo {
  constructor(name, description, isComplete = false, deadline = null) {
    this.name = name;
    this.description = description;
    this.isComplete = isComplete;
    this.deadline = deadline;
  }
}

addBtn.addEventListener("click", () => {
  if (nameInput.value) {
    incompleteToDos.push(new ToDo(nameInput.value, descriptionInput.value));
    nameInput.value = "";
    descriptionInput.value = "";
  } else {
    alert("Please provide a valid task name.");
  }
  renderToDos();
  console.log(incompleteToDos);
});

function renderToDos() {
  incompleteList.innerHTML = "";
  for (let i = 0; i < incompleteToDos.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = `ToDo Name: ${incompleteToDos[i].name} <input type="checkbox" id="complete-check"> <br>
                    ToDo Description: ${incompleteToDos[i].description}`;
    incompleteList.appendChild(li);
  }
}
