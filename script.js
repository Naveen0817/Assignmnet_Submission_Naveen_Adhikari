// Function to create a new task item
function createTaskItem(title, description, dueDate) {
    const item = document.createElement('li');
    item.className = 'task-item';
    item.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <span>Due Date: ${dueDate}</span>
        <div class="task-actions">
            <button onclick="viewTaskDetails(this)">View Details</button>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
        </div>
        <div class="task-details">
            <p><strong>Title:</strong> ${title}</p>
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Due Date:</strong> ${dueDate}</p>
        </div>
    `;
    return item;
}

// Function to add a new task to the list
function addTask() {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('taskDueDate').value;

    if (title.trim() === '' || description.trim() === '' || dueDate.trim() === '') {
        alert('Please fill in all fields before adding a task.');
        return;
    }

    const taskList = document.getElementById('taskList');
    const taskItem = createTaskItem(title, description, dueDate);
    taskList.appendChild(taskItem);

    // Reset the form
    document.getElementById('addTaskModal').style.display = 'none';
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskDueDate').value = '';
}

// Function to view task details
function viewTaskDetails(btn) {
    const details = btn.parentNode.parentNode.querySelector('.task-details');
    if (details.style.display === 'none') {
        details.style.display = 'block';
    } else {
        details.style.display = 'none';
    }
}

// Function to edit a task
function editTask(btn) {
    const taskItem = btn.parentNode.parentNode;
    const title = taskItem.querySelector('h3').textContent;
    const description = taskItem.querySelector('p:nth-child(2)').textContent;
    const dueDate = taskItem.querySelector('span').textContent.split(': ')[1].trim();

    // Populate the edit form with current values
    document.getElementById('editTaskTitle').value = title;
    document.getElementById('editTaskDescription').value = description;
    document.getElementById('editTaskDueDate').value = dueDate;

    // Show the edit modal
    document.getElementById('editTaskModal').style.display = 'block';
}

// Function to save edited task
function saveEditedTask() {
    const title = document.getElementById('editTaskTitle').value;
    const description = document.getElementById('editTaskDescription').value;
    const dueDate = document.getElementById('editTaskDueDate').value;

    // Update the task item with new values
    const taskItem = document.querySelector('.edit-task');
    taskItem.querySelector('h3').textContent = title;
    taskItem.querySelector('p:nth-child(2)').textContent = description;
    taskItem.querySelector('span').textContent = `Due Date: ${dueDate}`;

    // Hide the edit modal
    document.getElementById('editTaskModal').style.display = 'none';
}

// Function to delete a task
function deleteTask(btn) {
    const taskItem = btn.parentNode.parentNode;
    taskItem.remove();
}

// Event listeners for modal windows
document.getElementById('addTaskBtn').onclick = function() {
    document.getElementById('addTaskModal').style.display = 'block';
};

document.getElementById('saveTaskBtn').onclick = addTask;

document.querySelector('.close').onclick = function() {
    document.getElementById('addTaskModal').style.display = 'none';
};

// Additional event listener to close the modal when clicking outside of it
window.onclick = function(event) {
    if (event.target === document.getElementById('addTaskModal')) {
        document.getElementById('addTaskModal').style.display = 'none';
    }
};