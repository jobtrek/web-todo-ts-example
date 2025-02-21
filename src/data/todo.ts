// Type definition of a todo for de react app
// Types in this entity must be converted from the one of the DTOs
export type Todo = {
  id: number
  text: string
  content: string
  due_date: Date
  done: boolean
}

// DTO for api requests
export type InsertTodoDto = {
  text: string
  content?: string
  due_date?: Date
  done?: boolean
}

// DTO for api returns
export type GetTodoDto = {
  id: number
  text: string
  content: string
  due_date: string
  done: boolean
}
