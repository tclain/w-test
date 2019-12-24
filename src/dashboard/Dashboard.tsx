import * as React from 'react'
import { PropertiesListContainer } from './properties/PropertyList'
import { Switch, Route } from 'react-router'
import { TodosContainer } from './todos/Todos'
import { SelectedPropertyContext } from './properties/data'
import './Dashboard.css'
import { ModulesList } from './modules/ModulesList'
import { Logout } from '../auth/Logout'

export const Dashboard = () => {
    return (
        <div className="dashboard columns-layout">
            <SelectedPropertyContext.Provider>
                <PropertiesListContainer />
                <ModulesList />
                <div className="content">
                    <Switch>
                        <Route
                            path="/dashboard/todos"
                            component={TodosContainer}
                        ></Route>
                    </Switch>
                </div>
            </SelectedPropertyContext.Provider>
            <Logout />
        </div>
    )
}
