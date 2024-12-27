// HTML structure
const appContainer = document.createElement('div');
appContainer.id = 'app';

document.body.appendChild(appContainer);

// Add input field and button for adding tasks
const inputField = document.createElement('input');
inputField.type = 'text';
inputField.id = 'taskInput';
inputField.placeholder = 'Enter a task...';

const addButton = document.createElement('button');
addButton.id = 'addTaskButton';
addButton.innerText = 'Add Task';

appContainer.appendChild(inputField);
appContainer.appendChild(addButton);

// Task list container
const taskList = document.createElement('ul');
taskList.id = 'taskList';
appContainer.appendChild(taskList);

// Add event listener to the add button
addButton.addEventListener('click', () => {
  const taskText = inputField.value.trim();

  if (taskText !== '') {
    const taskItem = document.createElement('li');
    taskItem.className = 'taskItem';

    const taskContent = document.createElement('span');
    taskContent.innerText = taskText;
    
    // Mark as completed button
    const completeButton = document.createElement('button');
    completeButton.innerText = '✔';
    completeButton.addEventListener('click', () => {
      taskContent.style.textDecoration = 'line-through';
    });

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerText = '🗑';
    deleteButton.addEventListener('click', () => {
      taskList.removeChild(taskItem);
    });

    taskItem.appendChild(taskContent);
    taskItem.appendChild(completeButton);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
    inputField.value = '';
  }
});
