import { createTodo } from "./data/apiService"
import type { InsertTodoDto, Todo } from "./data/todo"

const STORAGE_KEY = 'todolist'

export const addTodo = async (
  todoList: Todo[],
  content: unknown,
  dueDate: unknown
): Promise<Todo[]> => {
  if (typeof content !== 'string') {
    throw new Error('Content must be a string')
  }
  if (content.length < 1) {
    throw new Error('Content must not be empty')
  }
  const todoToCreate: InsertTodoDto = {
    text: content
  }

  // Verify date only if one is provided
  if (typeof dueDate === 'string' && dueDate.length > 0) {
    const date = new Date(dueDate)
    if (Number.isNaN(date.getTime())) {
      throw new Error('Invalid due date')
    }
    todoToCreate.due_date = date
  }

  const addedTodo = await createTodo(todoToCreate)

  todoList.push(addedTodo)
  return todoList
}

export const removeTodo = (todoList: Todo[], id: number): Todo[] => {
  const index = todoList.findIndex((todo) => todo.id === id)
  if (index === -1) {
    throw new Error('Todo not found')
  }
  todoList.splice(index, 1)
  save(todoList)
  return todoList
}

export const updateTodo = (
  todoList: Todo[],
  id: number,
  content: unknown,
  dueDate: unknown,
  completed: unknown,
): Todo[] => {
  const todo = todoList.find((todo) => todo.id === id)
  if (!todo) {
    throw new Error('Todo not found')
  }
  if (typeof content !== 'string') {
    throw new Error('Content must be a string')
  }
  if (content.length < 1) {
    throw new Error('Content must not be empty')
  }
  // @ts-ignore - types guard not ensured, but no need to respect them
  const date = new Date(dueDate)
  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid due date')
  }
  if (typeof completed !== 'boolean') {
    throw new Error('Completed must be a boolean')
  }

  todo.text = content
  todo.due_date = date
  todo.done = completed
  save(todoList)
  return todoList
}

export const toggleTodo = (todoList: Todo[], id: number): Todo[] => {
  const todo = todoList.find((todo) => todo.id === id)
  if (!todo) {
    throw new Error('Todo not found')
  }
  todo.done = !todo.done
  save(todoList)
  return todoList
}

const randomId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`

const save = (todoList: Todo[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList))
}

export const load = (): Todo[] => {
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) {
    return []
  }
  return JSON.parse(data)
}
