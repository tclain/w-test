import { delay } from '../utils/time'
import { database, add, update, remove } from './database'
import { ID } from './types'

export const getTodosForUserAndProperty = async (
    userId: ID,
    propertyId: ID
) => {
    await delay(800)
    return Object.values(database.todos).filter(
        todo => todo.user === userId && todo.property === propertyId
    )
}

export const getTodoById = async todoId => {
    await delay(400)
    return database.todos[todoId]
}

export const createTodo = add('todos')
export const updateTodo = update('todos')
export const deleteTodo = remove('todos')
