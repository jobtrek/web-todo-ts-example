import type { GetTodoDto, InsertTodoDto, Todo } from './todo.ts'

// Specify your API endpoint here
const TODO_SERVICE_ENDPOINT = 'https://api.todo.in.jt-lab.ch/'

/**
 * Maps the deserialized todo to an instance of Todo
 * - Converts the due_date string to a Date
 * @param todo
 */
const mapGetTodoDtoToTodo = (todo: GetTodoDto): Todo => ({
  ...todo,
  due_date: new Date(todo.due_date),
})

const getAllTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${TODO_SERVICE_ENDPOINT}/todos`, {
    headers: {
      Accept: 'application/json',
    },
  })
  if (!response.ok) {
    throw new Error(`The request reported an error ${response.status}`)
  }
  const json = (await response.json()) as GetTodoDto[]
  return json.map(mapGetTodoDtoToTodo)
}

const getTodoById = async (id: number): Promise<Todo> => {
  const response = await fetch(`${TODO_SERVICE_ENDPOINT}/todos?id=eq.${id}`, {
    headers: {
      Accept: 'application/json',
    },
  })
  if (!response.ok) {
    throw new Error(`The request reported an error ${response.status}`)
  }
  const json = (await response.json()) as GetTodoDto
  return mapGetTodoDtoToTodo(json)
}

const createTodo = async (todo: InsertTodoDto): Promise<Todo> => {
  const response = await fetch(`${TODO_SERVICE_ENDPOINT}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.pgrst.object+json',
    },
    body: JSON.stringify(todo),
  })
  if (!response.ok) {
    throw new Error(`The request reported an error ${response.status}`)
  }
  const json = (await response.json()) as GetTodoDto
  return mapGetTodoDtoToTodo(json)
}

const updateTodo = async (todo: Todo): Promise<Todo> => {
  const response = await fetch(
    `${TODO_SERVICE_ENDPOINT}/todos?id=eq.${todo.id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.pgrst.object+json',
      },
      body: JSON.stringify({
        // Do not send the id (already in URL)
        text: todo.text,
        content: todo.content,
        due_date: todo.due_date.toISOString(),
        done: todo.done,
      }),
    },
  )
  if (!response.ok) {
    throw new Error(`The request reported an error ${response.status}`)
  }
  const json = (await response.json()) as GetTodoDto
  return mapGetTodoDtoToTodo(json)
}

const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`${TODO_SERVICE_ENDPOINT}/todos?id=eq.${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error(`The request reported an error ${response.status}`)
  }
}

export { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo }
