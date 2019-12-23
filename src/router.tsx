import * as React from 'react'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
import { Login } from './auth/Login'
import { Dashboard } from './dashboard/Dashboard'
import { useAuthentication, UserContext } from './auth/user'

export const Startup = ({ children }) => {
    useAuthentication()
    return children
}

export const App = ({ history = createBrowserHistory() }) => {
    return (
        <Router history={history}>
            <UserContext.Provider>
                <Startup>
                    <Switch>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/dashboard" component={Dashboard}></Route>
                    </Switch>
                </Startup>
            </UserContext.Provider>
        </Router>
    )
}
