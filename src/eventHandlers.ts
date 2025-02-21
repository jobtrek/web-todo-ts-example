import type { Todo } from './data/todo'
import { renderTodoList } from './todoDisplay.ts'
import { addTodo, removeTodo, toggleTodo } from './todoStorage.ts'

export const addTodoHandler = (
  todoList: Todo[],
  content: unknown,
  dueDate: unknown,
  todoListDisplay: HTMLUListElement,
) => {
  addTodo(todoList, content, dueDate)
  renderTodoList(todoList, todoListDisplay)
}

export const removeTodoHandler = (
  todoList: Todo[],
  id: number,
  todoListDisplay: HTMLUListElement,
) => {
  removeTodo(todoList, id)
  renderTodoList(todoList, todoListDisplay)
}

export const toggleTodoHandler = (
  todoList: Todo[],
  id: number,
  todoListDisplay: HTMLUListElement,
) => {
  toggleTodo(todoList, id)
  renderTodoList(todoList, todoListDisplay)
}