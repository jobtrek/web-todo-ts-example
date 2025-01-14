import { load } from './todoStorage.ts'
import { addTodoHandler } from './todoDisplay.ts'

/**
 * This function initializes the todo list application.
 * @param todoInput
 * @param dueDateInput
 * @param addTodoButton
 * @param todoListDisplay
 */
export const startTodoListApplication = (
  todoInput: HTMLInputElement,
  dueDateInput: HTMLInputElement,
  addTodoButton: HTMLButtonElement,
  todoListDisplay: HTMLUListElement,
) => {
  console.log('Starting todo list application')
  const todos = load()

  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTodoHandler(
        todos,
        todoInput.value,
        dueDateInput.value,
        todoListDisplay,
      )
    }
  })

  addTodoButton.addEventListener('click', () => {
    addTodoHandler(todos, todoInput.value, dueDateInput.value, todoListDisplay)
  })
}
