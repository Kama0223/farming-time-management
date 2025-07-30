// Select elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('task-list');

// Load existing tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task' + (task.completed ? ' completed' : '');
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Done'}</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add a new task
addTaskBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = '';
        renderTasks();
    }
});

// Toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Initial render
renderTasks();
