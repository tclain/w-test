import * as React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Login } from './auth/Login'
import { Dashboard } from './dashboard/Dashboard'
import { Todos } from './dashboard/todos/Todos'
import { useAuthenticationState } from './auth/user'

export const Router = () => {
    console.log('component')
    useAuthenticationState()
    return (
        <BrowserRouter>
            <Route path="login">
                <Login />
            </Route>
            <Route path="/dashboard">
                <Dashboard />
            </Route>
            <Route path="/dashboard/todo">
                <Todos></Todos>
            </Route>
        </BrowserRouter>
    )
}
