import { useEffect, useState } from 'react'
import { Todo } from '../../api/types'
import { useAsync } from '../../utils/async'
import { UserContext } from '../../auth/user'
import {
    getTodosForUserAndProperty,
    deleteTodo,
    createTodo,
} from '../../api/todos'
import { useSelectedProperty } from '../properties/data'

/** a pragramatic self contained entity manager, this code could easily be generated */
export const useTodos = () => {
    const { user } = UserContext.use()
    const { property } = useSelectedProperty()

    const [todos, setTodos] = useState<Todo[]>([])

    const todosListAsync = useAsync<Todo[]>(async () => {
        const todos = await getTodosForUserAndProperty(user.id, property.id)
        setTodos(todos)
        return todos
    })

    // EXAMPLE OF FORM HANDLING FOR an entity
    const removeTodoAsync = useAsync(async id => {
        setTodos(todos.filter(todo => todo.id !== id))
        await deleteTodo(id)
    })

    const newTodo = () => {
        setTodos([
            ...todos,
            { user: user.id, property: property.id, title: '', done: false },
        ])
    }

    const createTodoAsync = useAsync(async (todo: Todo) => {
        const { id } = await createTodo(todo)

        const newTodos = [...todos]
        newTodos[newTodos.length - 1].id = id
        setTodos(newTodos)
    })

    useEffect(() => {
        if (user && property) todosListAsync.run()
    }, [property])

    return {
        todosListAsync,
        removeTodoAsync,
        newTodo,
        createTodoAsync,
        todos,
    }
}
