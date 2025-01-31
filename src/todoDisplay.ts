import {
  type Todo,
  addTodo,
  removeAllTodos,
  removeTodo,
  toggleTodo,
} from './todoStorage.ts'

const addTodoHandler = (
  todoList: Todo[],
  content: HTMLInputElement,
  dueDate: HTMLInputElement,
  todoListDisplay: HTMLUListElement,
  errorContainer: HTMLDivElement,
) => {
  try {
    addTodo(todoList, content.value, dueDate.value)
    renderTodoList(todoList, todoListDisplay)
    content.value = ''
    dueDate.value = ''
  } catch (error: unknown) {
    if (error instanceof Error) {
      displayErrorMessage(error.message, errorContainer)
    }
  }
}

const displayErrorMessage = (
  message: string,
  errorContainer: HTMLDivElement,
) => {
  const p = document.createElement('p')
  p.classList.add('red')
  p.textContent = message
  errorContainer.append(p)
  setTimeout(() => {
    errorContainer.innerHTML = ''
  }, 3000)
}

const removeTodoHandler = (
  todoList: Todo[],
  id: string,
  todoListDisplay: HTMLUListElement,
) => {
  removeTodo(todoList, id)
  renderTodoList(todoList, todoListDisplay)
}

const removeAllTodosHandler = (
  todoList: Todo[],
  todoListDisplay: HTMLUListElement,
) => {
  removeAllTodos(todoList)
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

const renderTodoList = (
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

export { addTodoHandler, removeAllTodosHandler, renderTodoList }
