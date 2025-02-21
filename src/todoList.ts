import { getAllTodos } from './data/apiService.ts'
import { addTodoHandler } from './eventHandlers.ts'

/**
 * This function initializes the todo list application.
 * @param todoInput
 * @param dueDateInput
 * @param addTodoButton
 * @param todoListDisplay
 */
export const startTodoListApplication = async (
  todoInput: HTMLInputElement,
  dueDateInput: HTMLInputElement,
  addTodoButton: HTMLButtonElement,
  todoListDisplay: HTMLUListElement,
) => {
  console.log('Starting todo list application')
  const todos = await getAllTodos()

  /**
   * Events for todo creation
   */
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

  /**
   * Event to disable button when no text is present
   */
  todoInput.addEventListener('input', () => {
    addTodoButton.disabled = todoInput.value.length < 1
  })
}
