// // define UI vars

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-task");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// load all event listener

loadEventListener();

function loadEventListener() {
  // add task event

  form.addEventListener("submit", addTask);
  // remove task

  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTask);
  //

  filter.addEventListener("keyup", filterTask);
}

// add task function

function addTask(e) {
  if (taskInput.value === "") {
    alert("add task");
  }

  // create li element
  const li = document.createElement("li");

  // add class
  li.className = "collection-item";
  // create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  // create new link element
  const link = document.createElement("a");
  // add class
  link.className = "delete-item secondary-content";

  // add icon html
  link.innerHTML = '<i class="fa fa-remove"> </i>';
  // append link to li
  li.appendChild(link);
  // append li to ul
  taskList.appendChild(li);

  // store in local storage

  storeTaskInLocalStorage(taskInput.value);

  // clear input
  taskInput.value = "";

  e.preventDefault();
}
// add storage function

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("task") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("task"));
  }
  tasks.push(task);
  localStorage.setItem("task", JSON.stringify(tasks));
}

// remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("are you sure")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

function clearTask() {
  taskList.innerHTML = "";

  // faster

  //   while (taskList.firstChild) {
  //     taskList.removeChild(taskList.firstChild);
  //   }
}

function filterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLocaleLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
