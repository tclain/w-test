import * as React from 'react'
import { PropertiesListContainer } from './properties/PropertyList'
import { Switch, Route } from 'react-router'
import { TodosContainer } from './todos/Todos'
import { SelectedPropertyContext } from './properties/data'
import { Link } from 'react-router-dom'

export const Dashboard = () => {
    return (
        <div className="dashboard sidebar-layout">
            <SelectedPropertyContext.Provider>
                <div className="modules">
                    <div className="module-link">
                        <Link to="/dashboard/todos">Todos</Link>
                    </div>
                </div>
                <PropertiesListContainer />
                <div className="content">
                    <Switch>
                        <Route
                            path="/dashboard/todos"
                            component={TodosContainer}
                        ></Route>
                    </Switch>
                </div>
            </SelectedPropertyContext.Provider>
        </div>
    )
}
