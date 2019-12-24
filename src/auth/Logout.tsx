import * as React from 'react'
import { Button } from '../components/Button'
import { uselogout, UserContext } from './user'
import './Logout.css'

export const Logout = () => {
    const { user } = UserContext.use()
    const logoutAction = uselogout()

    return (
        <div className="logout">
            <div>{user && user.email}</div>
            <Button onClick={logoutAction}>Logout</Button>
        </div>
    )
}
