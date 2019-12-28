import * as React from 'react'
import { Todo } from '../../api/types'
import { useTodos } from './data'
import './Todos.css'

export interface ITodoItemProps {
    todo: Todo
}

export const TodoItem: React.FC<ITodoItemProps> = ({ todo }) => {
    return (
        <li className="todo">
            <div className="done-state">
                <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={console.log}
                />
            </div>
            <div className="todo-text">{todo.title}</div>
        </li>
    )
}

export interface ITodoListProps {
    todos: Todo[]
}

export const TodoList: React.FC<ITodoListProps> = ({ todos }) => {
    return (
        <ul className="todos">
            {todos.map(todo => (
                <TodoItem todo={todo} />
            ))}
        </ul>
    )
}

export const TodosContainer = () => {
    const {
        todosListAsync: { loading, error },
        todos,
    } = useTodos()
    return (
        <div className="todos">
            <h3>Todos</h3>
            {!loading && !error && <TodoList todos={todos || []} />}
        </div>
    )
}
