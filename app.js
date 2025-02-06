// HTML structure

const appContainer = document.getElementById('app');

// Retrieve the input fields and button from the existing HTML elements
const inputField = document.getElementById('taskInput');
const categoryField = document.getElementById('categoryInput');
const deadlineField = document.getElementById('deadlineInput');
const priorityField = document.getElementById('priorityInput');
const addButton = document.getElementById('addTaskButton');

// Create the Task list container (if it does not already exist in HTML)
let taskList = document.getElementById('taskList');
if (!taskList) {
  taskList = document.createElement('ul');
  taskList.id = 'taskList';
  appContainer.appendChild(taskList);
}

// Add event listener to the add button
addButton.addEventListener('click', () => {
  const taskText = inputField.value.trim();
  const categoryText = categoryField.value.trim();
  const deadlineText = deadlineField.value;
  const priorityText = priorityField.value;

  if (taskText !== '') {
    const taskItem = document.createElement('li');
    taskItem.className = 'taskItem';
    // Set dataset for sorting
    taskItem.dataset.category = categoryText || 'No Category';
    taskItem.dataset.deadline = deadlineText;
    taskItem.dataset.priority = priorityText;

    const taskContent = document.createElement('span');
    taskContent.innerText = `${taskText} [${categoryText || 'No Category'} - Due: ${deadlineText || 'N/A'} - Priority: ${priorityText || 'N/A'}]`;
    
    // Mark as completed button
    const completeButton = document.createElement('button');
    completeButton.innerText = '✔';
    completeButton.addEventListener('click', () => {
      // Toggle completed style
      taskContent.style.textDecoration = taskContent.style.textDecoration === 'line-through' ? 'none' : 'line-through';
      saveTasks();
    });

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerText = '🗑';
    deleteButton.addEventListener('click', () => {
      taskList.removeChild(taskItem);
      saveTasks();
    });

    taskItem.appendChild(taskContent);
    taskItem.appendChild(completeButton);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
    // Clear inputs
    inputField.value = '';
    categoryField.value = '';
    deadlineField.value = '';
    priorityField.value = '';
    saveTasks();
  }
});

//Sort function
const sortBy = document.getElementById('sortBy');
sortBy.addEventListener('change', () => {
  const criterion = sortBy.value;
  // Get all task items
  const tasks = Array.from(document.querySelectorAll('.taskItem'));

  tasks.sort((a, b) => {
    switch (criterion) {
      case 'category':
        return a.dataset.category.localeCompare(b.dataset.category);
      case 'priority':
        return a.dataset.priority.localeCompare(b.dataset.priority);
      case 'deadline':
        return new Date(a.dataset.deadline) - new Date(b.dataset.deadline);
      default:
        return 0;
    }
  });

  // Clear current list and re-append sorted tasks
  taskList.innerHTML = '';
  tasks.forEach(task => taskList.appendChild(task));
  // Optionally save the new order
  saveTasks();
});


//Search function
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  document.querySelectorAll('.taskItem').forEach(task => {
    const text = task.querySelector('span').innerText.toLowerCase();
    task.style.display = text.includes(query) ? 'flex' : 'none';
  });
});

//Task Storage

//Save Task
const saveTasks = () => {
  const tasks = Array.from(taskList.children).map(task => ({
    text: task.querySelector('span').innerText,
    category: task.dataset.category,
    deadline: task.dataset.deadline,
    priority: task.dataset.priority,
    completed: task.querySelector('span').style.textDecoration === 'line-through'
  }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

//Load Task
const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks) {
    tasks.forEach(taskData => {
      // Re-create the task item
      const taskItem = document.createElement('li');
      taskItem.className = 'taskItem';
      taskItem.dataset.category = taskData.category;
      taskItem.dataset.deadline = taskData.deadline;
      taskItem.dataset.priority = taskData.priority;

      const taskContent = document.createElement('span');
      taskContent.innerText = taskData.text;
      if (taskData.completed) {
        taskContent.style.textDecoration = 'line-through';
      }

      const completeButton = document.createElement('button');
      completeButton.innerText = '✔';
      completeButton.addEventListener('click', () => {
        taskContent.style.textDecoration = taskContent.style.textDecoration === 'line-through' ? 'none' : 'line-through';
        saveTasks();
      });
      const deleteButton = document.createElement('button');
      deleteButton.innerText = '🗑';
      deleteButton.addEventListener('click', () => {
        taskList.removeChild(taskItem);
        saveTasks();
      });
      
      taskItem.appendChild(taskContent);
      taskItem.appendChild(completeButton);
      taskItem.appendChild(deleteButton);
      
      taskList.appendChild(taskItem);
    });
  }
};

loadTasks();