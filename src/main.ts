import './style.css'
import { startTodoListApplication } from './todoList.ts'

// Retrieve all elements needed to run the app
const todoInput = document.querySelector<HTMLInputElement>('#todo-input')
const dueDateInput = document.querySelector<HTMLInputElement>('#due-date-input')
const addTodoButton =
  document.querySelector<HTMLButtonElement>('#add-todo-button')
const todoListDisplay =
  document.querySelector<HTMLUListElement>('#todo-list-display')
const deleteAllButton = document.querySelector<HTMLButtonElement>(
  '#remove-all-todo-button',
)
const errorContainer =
  document.querySelector<HTMLDivElement>('#error-container')

if (
  !todoInput ||
  !dueDateInput ||
  !addTodoButton ||
  !todoListDisplay ||
  !deleteAllButton ||
  !errorContainer
) {
  throw new Error('One or more html elements missing, cannot start the app.')
}

startTodoListApplication(
  todoInput,
  dueDateInput,
  addTodoButton,
  todoListDisplay,
  deleteAllButton,
  errorContainer,
)
