// Type definition of a todo for de react app
// Types in this entity must be converted from the one of the DTOs
export type Todo = {
  id: number
  title: string
  content: string
  due_date: Date
  done: boolean
}

// DTO for api requests
export type InsertTodoDto = {
  title: string
  content?: string
  due_date?: Date
  done?: boolean
}

// DTO for api returns
export type GetTodoDto = {
  id: number
  title: string
  content: string
  due_date: string
  done: boolean
}

/**
 * Todo storage, this array will be used as the source of truth for the app
 * It must always be updated before rendering
 */

export const todoList: Todo[] = []
