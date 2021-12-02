import './style.css';
import List from './list.js';

const todoList = new List();
todoList.display();
// This code adds a new activity
document.querySelector('#add-task').addEventListener('submit', (e) => {
  e.preventDefault();
  const activity = e.target.elements.activity.value;
  todoList.addActivity(activity);
  e.target.reset();
});

// This code clears activity
document.querySelector('.clear-completed').addEventListener('click', () => {
  todoList.clearCompleted();
});