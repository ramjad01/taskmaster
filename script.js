// Grab elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <button onclick="deleteTask(${index})">❌</button>
    `;
    taskList.appendChild(li);
  });
}

// Add task
function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  tasks.push({ text, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  renderTasks();
}

// Toggle task completion
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Event listeners
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Initial render
renderTasks();
