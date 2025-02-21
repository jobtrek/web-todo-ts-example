import { getAllTodos } from './data/apiService.ts'
import { todoList } from './data/todo.ts'
import { addTodoHandler } from './eventHandlers.ts'
import { renderTodoList } from './todoDisplay.ts'

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
  // Initial todos loading
  todoList.push(...await getAllTodos())
  // Initial rendering
  renderTodoList(todoList, todoListDisplay)

  /**
   * Events for todo creation
   */
  todoInput.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
      await addTodoHandler(
        todoInput.value,
        dueDateInput.value,
        todoListDisplay,
      )
    }
  })

  addTodoButton.addEventListener('click', async () => {
    await addTodoHandler(todoInput.value, dueDateInput.value, todoListDisplay)
  })

  /**
   * Event to disable button when no text is present
   */
  todoInput.addEventListener('input', () => {
    addTodoButton.disabled = todoInput.value.length < 1
  })
}
