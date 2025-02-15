// DOM Elements
const taskInput = document.getElementById('new-task');
const addButton = document.querySelector('.todo-form__button');
const incompleteTasksList = document.getElementById('incomplete-tasks');
const completedTasksList = document.getElementById('completed-tasks');

// Task creation
const createTaskElement = (taskText) => {
  const listItem = document.createElement('li');
  listItem.className = 'tasks-list__item';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'tasks-list__checkbox';

  const label = document.createElement('label');
  label.className = 'tasks-list__label';
  label.textContent = taskText;

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'tasks-list__input';

  const editButton = document.createElement('button');
  editButton.className = 'tasks-list__button tasks-list__button--edit';
  editButton.textContent = 'Edit';

  const deleteButton = document.createElement('button');
  deleteButton.className = 'tasks-list__button tasks-list__button--delete';

  const deleteImage = document.createElement('img');
  deleteImage.src = './assets/remove.svg';
  deleteImage.alt = 'Delete task';
  deleteImage.className = 'tasks-list__delete-icon';
  deleteButton.appendChild(deleteImage);

  listItem.append(checkbox, label, input, editButton, deleteButton);
  return listItem;
};

// Task handlers
const addTask = (event) => {
  event.preventDefault();
  if (!taskInput.value.trim()) return;

  const listItem = createTaskElement(taskInput.value);
  incompleteTasksList.appendChild(listItem);
  bindTaskEvents(listItem, markTaskComplete);
  taskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;
  const input = listItem.querySelector('.tasks-list__input');
  const label = listItem.querySelector('.tasks-list__label');
  const isEditMode = listItem.classList.contains('tasks-list__item--edit-mode');

  if (isEditMode) {
    label.textContent = input.value;
    this.textContent = 'Edit';
  } else {
    input.value = label.textContent;
    this.textContent = 'Save';
  }

  listItem.classList.toggle('tasks-list__item--edit-mode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  listItem.remove();
};

const markTaskComplete = function () {
  const listItem = this.parentNode;
  completedTasksList.appendChild(listItem);
  bindTaskEvents(listItem, markTaskIncomplete);
};

const markTaskIncomplete = function () {
  const listItem = this.parentNode;
  incompleteTasksList.appendChild(listItem);
  bindTaskEvents(listItem, markTaskComplete);
};

// Event binding
const bindTaskEvents = (taskItem, checkboxHandler) => {
  const checkbox = taskItem.querySelector('.tasks-list__checkbox');
  const editButton = taskItem.querySelector('.tasks-list__button--edit');
  const deleteButton = taskItem.querySelector('.tasks-list__button--delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = checkboxHandler;
};

// Initialize event listeners
document.querySelector('.todo-form').addEventListener('submit', addTask);

// Bind events to existing tasks
document
  .querySelectorAll('#incomplete-tasks .tasks-list__item')
  .forEach((item) => {
    bindTaskEvents(item, markTaskComplete);
  });

document
  .querySelectorAll('#completed-tasks .tasks-list__item')
  .forEach((item) => {
    bindTaskEvents(item, markTaskIncomplete);
  });
