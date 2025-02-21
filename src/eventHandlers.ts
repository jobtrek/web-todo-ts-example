import { todoList } from './data/todo'
import { renderTodoList } from './todoDisplay.ts'
import { addTodo, removeTodo, toggleTodo } from './todoStorage.ts'

export const addTodoHandler = async (
  content: unknown,
  dueDate: unknown,
  todoListDisplay: HTMLUListElement,
): Promise<void> => {
  todoList.splice(
    0,
    todoList.length,
    ...(await addTodo(todoList, content, dueDate)),
  )
  renderTodoList(todoList, todoListDisplay)
}

export const removeTodoHandler = async (
  id: number,
  todoListDisplay: HTMLUListElement,
): Promise<void> => {
  todoList.splice(0, todoList.length, ...(await removeTodo(todoList, id)))
  renderTodoList(todoList, todoListDisplay)
}

export const toggleTodoHandler = async (
  id: number,
  todoListDisplay: HTMLUListElement,
) => {
  todoList.splice(0, todoList.length, ...(await toggleTodo(todoList, id)))
  renderTodoList(todoList, todoListDisplay)
}
