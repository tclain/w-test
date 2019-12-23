import * as React from 'react'
import { Todo } from '../../api/types'
import { useTodos } from './data'
import { Button } from '../../components/Button'

export interface ITodoActions {
    onRemove: (id: string) => void
    onEdit: (todo: Todo) => void
}
export interface ITodoItemProps extends ITodoActions {
    todo: Todo
}

export const TodoItem: React.FC<ITodoItemProps> = ({
    todo,
    onRemove,
    onEdit,
}) => {
    return (
        <li className="todo">
            <div className="todo-text">{todo.title}</div>
            <div className="todo-action">
                <input type="checkbox" />
                <Button>Delete</Button>
                <Button>Edit</Button>
            </div>
        </li>
    )
}

export interface ITodoListProps extends ITodoActions {
    todos: Todo[]
}

export const TodoList: React.FC<ITodoListProps> = ({
    todos,
    onRemove,
    onEdit,
}) => {
    return (
        <ul className="todos">
            {todos.map(todo => (
                <TodoItem todo={todo} onEdit={onEdit} onRemove={onRemove} />
            ))}
        </ul>
    )
}

export const TodosContainer = () => {
    const { data, loading, error } = useTodos()
    console.log('todo', data, loading, error)
    return (
        <div className="todos">
            <h2>Todos</h2>
            {!loading && !error && (
                <TodoList
                    todos={data || []}
                    onEdit={console.log}
                    onRemove={console.info}
                />
            )}
        </div>
    )
}
