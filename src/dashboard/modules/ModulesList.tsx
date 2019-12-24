import * as React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Modules.css'

export const ModulesList = () => {
    const isTodo = useLocation().pathname.includes('todo')
    return (
        <div className="modules-pane">
            <h3>Modules</h3>
            <ul className="modules">
                <li
                    className={['module-link', isTodo && 'selected']
                        .filter(Boolean)
                        .join(' ')}
                >
                    <Link to="/dashboard/todos">Todos</Link>
                </li>
            </ul>
        </div>
    )
}
