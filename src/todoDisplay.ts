import { type Todo, addTodo, removeTodo, toggleTodo } from './todoStorage.ts'

export const addTodoHandler = (
  todoList: Todo[],
  content: unknown,
  dueDate: unknown,
  todoListDisplay: HTMLUListElement,
) => {
  addTodo(todoList, content, dueDate)
  renderTodoList(todoList, todoListDisplay)
}

const removeTodoHandler = (
  todoList: Todo[],
  id: string,
  todoListDisplay: HTMLUListElement,
) => {
  removeTodo(todoList, id)
  renderTodoList(todoList, todoListDisplay)
}

const toggleTodoHandler = (
  todoList: Todo[],
  id: string,
  todoListDisplay: HTMLUListElement,
) => {
  toggleTodo(todoList, id)
  renderTodoList(todoList, todoListDisplay)
}

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
    todoDate.textContent = todo.duDate.toDateString()
    todoDate.dateTime = todo.duDate.toISOString()
    const todoComplete = document.createElement('input')
    todoComplete.type = 'checkbox'
    todoComplete.checked = todo.completed
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
