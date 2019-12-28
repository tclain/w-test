import * as React from 'react'
import { Todo } from '../../api/types'
import { useTodos } from './data'
import { Button } from '../../components/Button'
import './Todos.css'
import { useSelectedProperty } from '../properties/data'
import { Input } from '../../components/Input'
import { useForm } from '../../utils/forms'

export interface ITodoActions {
    onRemove: (id: string) => void
    onEdit: (todo: Todo) => void
    onCreate: (todo: Todo) => void
}
export interface ITodoItemProps extends ITodoActions {
    todo: Todo
}

export const TodoItem: React.FC<ITodoItemProps> = ({
    todo,
    onRemove,
    onEdit,
    onCreate,
}) => {
    const [editing, setEditing] = React.useState(false)

    const { inputProps, reset, form } = useForm({
        defaults: { text: todo.title },
        validations: {},
    })
    return (
        <li className="todo">
            <div className="done-state">
                <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={console.log}
                />
            </div>
            <div className="todo-text">
                {editing ? <Input {...inputProps('text')} /> : todo.title}
            </div>

            {editing ? (
                <div className="todo-actions">
                    <div
                        className="action"
                        onClick={() => {
                            reset()
                            setEditing(false)
                        }}
                    >
                        cancel
                    </div>
                    <div
                        className="action"
                        onClick={() => onCreate({ ...todo, title: form.text })}
                    >
                        save
                    </div>
                </div>
            ) : (
                <div className="todo-actions">
                    <div className="action" onClick={() => onRemove(todo.id)}>
                        delete
                    </div>
                </div>
            )}
        </li>
    )
}

export interface ITodoListProps extends ITodoActions {
    todos: Todo[]
    onSeed: () => void
}

export const TodoList: React.FC<ITodoListProps> = ({
    todos,
    onRemove,
    onEdit,
    onCreate,
    onSeed,
}) => {
    return (
        <ul className="todos">
            {todos.map(todo => (
                <TodoItem
                    todo={todo}
                    onEdit={onEdit}
                    onRemove={onRemove}
                    onCreate={onCreate}
                />
            ))}
            <li>
                <Button onClick={onSeed}>New todo</Button>
            </li>
        </ul>
    )
}

export const TodosContainer = () => {
    const {
        todosListAsync: { loading, error },
        todos,
        createTodoAsync,
        removeTodoAsync,
        newTodo,
    } = useTodos()
    return (
        <div className="todos">
            <h3>Todos</h3>
            {!loading && !error && (
                <TodoList
                    todos={todos || []}
                    onEdit={console.log}
                    onRemove={removeTodoAsync.run}
                    onCreate={createTodoAsync.run}
                    onSeed={newTodo}
                />
            )}
        </div>
    )
}
