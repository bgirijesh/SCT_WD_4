const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

addBtn.addEventListener("click", addTask);
taskList.addEventListener("click", handleActions);

function addTask() {
    const text = taskInput.value.trim();
    const date = taskDate.value;

    if (text === "") return;

    tasks.push({
        id: Date.now(),
        text,
        date,
        completed: false
    });

    taskInput.value = "";
    taskDate.value = "";

    saveAndRender();
}

function handleActions(e) {
    const id = e.target.parentElement?.parentElement?.dataset.id;

    if (e.target.classList.contains("complete")) {
        toggleComplete(id);
    }
    if (e.target.classList.contains("edit")) {
        editTask(id);
    }
    if (e.target.classList.contains("delete")) {
        deleteTask(id);
    }
}

function toggleComplete(id) {
    tasks = tasks.map(task =>
        task.id == id ? { ...task, completed: !task.completed } : task
    );
    saveAndRender();
}

function editTask(id) {
    const task = tasks.find(t => t.id == id);
    const newText = prompt("Edit task", task.text);
    if (newText !== null) {
        task.text = newText;
        saveAndRender();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id != id);
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.dataset.id = task.id;
        li.className = task.completed ? "completed" : "";

        li.innerHTML = `
            <div class="task-info">
                <div>${task.text}</div>
                <div class="task-time">${task.date || ""}</div>
            </div>
            <div class="actions">
                <button class="complete">✔</button>
                <button class="edit">✏</button>
                <button class="delete">🗑</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

renderTasks();
