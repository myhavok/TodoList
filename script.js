// Selectors
const taskList = document.querySelector('.task-list');
const inputTodo = document.getElementById('inputTodo');
const countPendingTasks = document.getElementById('countPendingTasks');

// Loads todos from local storage when the page is loaded
loadTodo();

// Function to handle the "Enter" key pressed
function enterKey(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
}

// Function to load todos from the local storage
function loadTodo() {
    const taskStorage = localStorage.getItem('taskStorage');
    if (taskStorage != null) {
        taskList.innerHTML = taskStorage;
        updateTaskEvents();
    }
    updateTaskCount();
}

// Function to add a new todo
function addTodo() {
    const taskValue = inputTodo.value.trim();

    if (taskValue !== '') {
        // Create task element using a template literal
        const taskElement = `
            <div class="task">
                <button class="check-btn">
                    <i class='bx bx-check'></i>
                </button>
                <span>${taskValue}</span>
                <button class="delete-btn">
                    <i class='bx bx-trash'></i>
                </button>
            </div>
        `;

        // Insert the new task element into the task list
        taskList.insertAdjacentHTML('afterbegin', taskElement);

        // Save tasks to local storage
        saveTodo();

        // Reset the input field
        inputTodo.value = '';
        updateTaskEvents();
        updateTaskCount();
    } else {
        alert('Please enter a task!');
    }
}

// Function to clear all todos
function clearAll() {
    taskList.innerHTML = '';
    saveTodo();
    updateTaskCount();
}

// Function to save todos to local storage
function saveTodo() {
    localStorage.setItem('taskStorage', taskList.innerHTML);
}

// Function to update the number of pending tasks
function updateTaskCount() {
    const tasks = taskList.querySelectorAll('.task:not(.checked)');
    countPendingTasks.textContent = tasks.length;
}

// Function to update events for check and delete buttons
function updateTaskEvents() {
    const checkButtons = taskList.querySelectorAll('.check-btn');
    const deleteButtons = taskList.querySelectorAll('.delete-btn');

    checkButtons.forEach(button => {
        button.onclick = () => {
            button.parentElement.classList.toggle('checked');
            button.classList.toggle('active'); // toggle active class
            saveTodo();
            updateTaskCount();
        };
    });

    deleteButtons.forEach(button => {
        button.onclick = () => {
            button.parentElement.remove();
            saveTodo();
            updateTaskCount();
        };
    });
}
