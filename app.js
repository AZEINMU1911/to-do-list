// HTML structure
const appContainer = document.createElement('div');
appContainer.id = 'app';

document.body.appendChild(appContainer);

// Add input field and button for adding tasks
const inputField = document.createElement('input');
inputField.type = 'text';
inputField.id = 'taskInput';
inputField.placeholder = 'Enter a task...';

const categoryField = document.createElement('input');
categoryField.type = 'text';
categoryField.id = 'taskCategory';
categoryField.placeholder = 'Enter a category...';

const deadlineField = document.createElement('input');
deadlineField.type = 'date';
deadlineField.id = 'deadlineInput';
deadlineField.placeholder = 'Set a deadline';

const priorityField = document.createElement('select');
priorityField.id = 'priorityInput';
const placeholderOption = document.createElement('option');
placeholderOption.value = "";
placeholderOption.disabled = true;
placeholderOption.selected = true;
placeholderOption.hidden = true;
placeholderOption.innerText = "Select Priority";
priorityField.appendChild(placeholderOption);

const priorities = ['Low','Medium','High'];
priorities.forEach(priority => {
  const option = document.createElement('option');
  option.value = priority;
  option.innerText = priority;
  priorityField.appendChild(option);
});

const addButton = document.createElement('button');
addButton.id = 'addTaskButton';
addButton.innerText = 'Add Task';

appContainer.appendChild(inputField);
appContainer.appendChild(categoryField);
appContainer.appendChild(deadlineField);
appContainer.appendChild(priorityField);
appContainer.appendChild(addButton);

// Task list container
const taskList = document.createElement('ul');
taskList.id = 'taskList';
appContainer.appendChild(taskList);

// Add event listener to the add button
addButton.addEventListener('click', () => {
  const taskText = inputField.value.trim();
  const categoryText = categoryField.value.trim();
  const deadlineText = deadlineField.value;
  const priorityText = priorityField.value;

  if (taskText !== '') {
    const taskItem = document.createElement('li');
    taskItem.className = 'taskItem';

    const taskContent = document.createElement('span');
    taskContent.innerText = `${taskText} [${categoryText || 'No Category'} - Due: ${deadlineText} - Priority: ${priorityText}]`;
    
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
    categoryField.value= '';
    deadlineField.value = '';
    priorityField.value = '';
  }
});

//Sort function
const sortBy = document.getElementById('sortBy');
sortBy.addEventListener('change', () => {
  const criterion = sortBy.value;
  const tasks = Array.from(document.querySelectorAll('.taskItem'));
  
  tasks.sort((a,b) =>{
    const aText = a.querySelectorAll('span').innerText.toLowerCase();
    const bText = b.querySelectorAll('span').innerText.toLowerCase();

    switch (criterion) {
      case 'category':
        return aText.localeCompare(bText);

        case 'priority':
          return a.dataset.priority.localeCompare(b.dataset.priority);

      case 'deadline':
        return new Date(a.dataset.deadline) - new Date(b.dataset.deadline);

      default:
        return 0;
    }
  });

  tasks.forEach(task => tasklist.appendChild(task));
})

//Search function
const searchInput = document.getElementById(searchinput);
searchInput.addEventListener('input', () => {
  const query = searchinput.value.toLowerCase();
  document.querySelectorAll('.taskItem').forEach(task => {
    const text = task.querySelectorAll('span').innerText.toLowerCase();
    task.style.display = text.include(query) ? 'flex' : 'none';
  });
});

//Self Storage