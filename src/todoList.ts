import {
  addTodoHandler,
  removeAllTodosHandler,
  renderTodoList,
} from './todoDisplay.ts'
import { load } from './todoStorage.ts'

/**
 * This function initializes the todo list application.
 * @param todoInput
 * @param dueDateInput
 * @param addTodoButton
 * @param todoListDisplay
 * @param deleteAllButton
 * @param errorContainer
 */
export const startTodoListApplication = (
  todoInput: HTMLInputElement,
  dueDateInput: HTMLInputElement,
  addTodoButton: HTMLButtonElement,
  todoListDisplay: HTMLUListElement,
  deleteAllButton: HTMLButtonElement,
  errorContainer: HTMLDivElement,
) => {
  console.log('Starting todo list application')
  // Initial todos loading and rendering
  const todos = load()
  renderTodoList(todos, todoListDisplay)

  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTodoHandler(
        todos,
        todoInput,
        dueDateInput,
        todoListDisplay,
        errorContainer,
      )
    }
  })

  addTodoButton.addEventListener('click', () => {
    addTodoHandler(
      todos,
      todoInput,
      dueDateInput,
      todoListDisplay,
      errorContainer,
    )
  })

  deleteAllButton.addEventListener('click', () => {
    removeAllTodosHandler(todos, todoListDisplay)
  })
}
