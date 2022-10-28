const inputTask = document.querySelector(".input-newTask");
const btnAddTask = document.querySelector(".btn-addTask");
const tasksList = document.querySelector(".tasks");

const createElement = () => {
  const element = document.createElement("li");
  return element;
};

inputTask.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    if (!inputTask.value) return;
    createTask(inputTask.value);
  }
});

const clearInput = () => {
  inputTask.value = "";
  inputTask.focus();
};

const CreateDeleteButton = (li) => {
  const deleteTaskButton = document.createElement("button");

  deleteTaskButton.innerText = "Delete";
  deleteTaskButton.setAttribute("class", "delete");
  deleteTaskButton.setAttribute("title", "Delete this task");
  li.appendChild(deleteTaskButton);
};

const createTask = (task) => {
  const li = createElement();

  li.innerText = task;
  tasksList.appendChild(li);
  clearInput();
  CreateDeleteButton(li);
  tasksSave();
};

btnAddTask.addEventListener("click", () => {
  if (!inputTask.value) return;
  createTask(inputTask.value);
});

document.addEventListener("click", (e) => {
  const el = e.target;

  if (el.classList.contains("delete")) {
    el.parentElement.remove();
    tasksSave();
  }
});

const tasksSave = () => {
  const taskElement = tasksList.querySelectorAll("li");
  const elementList = [];

  for (let task of taskElement) {
    let taskText = task.innerText;
    taskText = taskText.replace("Delete", "").trim();

    elementList.push(taskText);
  }

  const tasksJSON = JSON.stringify(elementList);
  localStorage.setItem("tasks", tasksJSON);
};

const addSavedTasks = () => {
  const tasks = localStorage.getItem("tasks");
  const taskListElements = JSON.parse(tasks);

  for (let savedTasks of taskListElements) {
    createTask(savedTasks);
  }
};
addSavedTasks();
