export type Todo = {
  id: string
  text: string
  completed: boolean
  duDate: Date
}

const STORAGE_KEY = 'todolist'

export const addTodo = (
  todoList: Todo[],
  content: string,
  dueDate: string,
  completed = false,
): Todo[] => {
  if (content.length < 1) {
    throw new Error('Content must not be empty')
  }
  // @ts-ignore - types guard not ensured, but no need to respect them
  const date = new Date(dueDate)
  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid due date')
  }

  todoList.push({
    id: randomId(),
    text: content,
    completed: completed,
    duDate: date,
  })
  save(todoList)
  return todoList
}

export const removeTodo = (todoList: Todo[], id: string): Todo[] => {
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
  id: string,
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
  todo.duDate = date
  todo.completed = completed
  save(todoList)
  return todoList
}

export const toggleTodo = (todoList: Todo[], id: string): Todo[] => {
  const todo = todoList.find((todo) => todo.id === id)
  if (!todo) {
    throw new Error('Todo not found')
  }
  todo.completed = !todo.completed
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
