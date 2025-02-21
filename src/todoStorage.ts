import { createTodo, deleteTodo, updateTodo } from './data/apiService'
import type { InsertTodoDto, Todo } from './data/todo'

export const addTodo = async (
  todoList: Todo[],
  content: unknown,
  dueDate: unknown,
): Promise<Todo[]> => {
  if (typeof content !== 'string') {
    throw new Error('Content must be a string')
  }
  if (content.length < 1) {
    throw new Error('Content must not be empty')
  }
  const todoToCreate: InsertTodoDto = {
    title: content,
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

  return [...todoList, addedTodo]
}

export const removeTodo = async (
  todoList: Todo[],
  id: number,
): Promise<Todo[]> => {
  await deleteTodo(id)
  return todoList.filter((todo) => todo.id !== id)
}

export const toggleTodo = async (
  todoList: Todo[],
  id: number,
): Promise<Todo[]> => {
  const todo = todoList.find((todo) => todo.id === id)
  if (!todo) {
    throw new Error('Todo not found')
  }
  todo.done = !todo.done
  const updatedTodo = await updateTodo(todo)
  // Return a new array with the updated todo
  return todoList.map((todo) =>
    todo.id === updatedTodo.id ? updatedTodo : todo,
  )
}
