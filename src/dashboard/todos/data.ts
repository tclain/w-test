import { useEffect } from 'react'
import { Todo } from '../../api/types'
import { useAsync } from '../../utils/async'
import { UserContext } from '../../auth/user'
import { getTodosForUserAndProperty } from '../../api/todos'
import {
    SelectedPropertyContext,
    useSelectedProperty,
} from '../properties/data'

export const useTodos = () => {
    const { user } = UserContext.use()
    const { property } = useSelectedProperty()

    const asyncTodos = useAsync<Todo[]>(() => {
        console.log(user.id, property.id)
        return getTodosForUserAndProperty(user.id, property.id)
    })
    useEffect(() => {
        if (user && property) asyncTodos.run()
    }, [property ? property.id : null])

    return asyncTodos
}
