import { useEffect, useState } from 'react'
import { fetchPersistedAuthenticationState, logout } from '../api'
import { useLocation, useHistory } from 'react-router'
import { User } from '../api/types'
import { contextFromHook } from '../utils/context'

export const pageRequiresAuthentication = (page: string) =>
    !page.includes('login')

const fetchAuthentication = ({ location, history, setUser }) => {
    const user = fetchPersistedAuthenticationState()
    setUser(user)
    if (!user && pageRequiresAuthentication(location.pathname)) {
        history.replace('/login')
    }
}

export const UserContext = contextFromHook(() => {
    const [user, setUser] = useState<User>(null)
    return {
        user,
        setUser: (u) => setUser(u) ,
    }
})

export const useAuthentication = () => {
    const location = useLocation()
    const history = useHistory()
    const { setUser } = UserContext.use()

    // fetch Authentication
    useEffect(() => {
        fetchAuthentication({ location, history, setUser })
    }, [])
}

export const uselogout = () => {
    const history = useHistory()
    const logoutAction = () => {
        logout()
        history.push('/login')
    }
    return logoutAction
}
