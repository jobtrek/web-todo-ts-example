import type { Todo } from './data/todo.ts'
import { removeTodoHandler, toggleTodoHandler } from './eventHandlers.ts'

export const renderTodoList = (
  todoList: Todo[],
  todoListDisplay: HTMLUListElement,
) => {
  todoListDisplay.innerHTML = ''
  for (const todo of todoList) {
    // add todo text, date and completion status to the list
    const todoElement = document.createElement('li')
    const todoText = document.createElement('span')
    todoText.textContent = todo.text
    const todoDate = document.createElement('time')
    todoDate.textContent = todo.due_date.toDateString()
    todoDate.dateTime = todo.due_date.toISOString()
    const todoComplete = document.createElement('input')
    todoComplete.type = 'checkbox'
    todoComplete.checked = todo.done
    todoComplete.addEventListener('change', () => {
      toggleTodoHandler(todoList, todo.id, todoListDisplay)
    })
    const todoRemove = document.createElement('button')
    todoRemove.textContent = 'Remove'
    todoRemove.addEventListener('click', () => {
      removeTodoHandler(todoList, todo.id, todoListDisplay)
    })
    todoElement.append(todoText, todoDate, todoComplete, todoRemove)
    todoListDisplay.append(todoElement)
  }
}
