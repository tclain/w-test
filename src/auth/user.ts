import { useContext, createContext, useEffect } from 'react'
import { fetchPersistedAuthenticationState } from '../api'
import { useLocation, useHistory } from 'react-router'

export const UserContext = createContext(null)

export const useUser = () => {
    return useContext(UserContext)
}

export const pageRequiresAuthentication = (page: string) =>
    !page.includes('login')

const useFetchAuthentication = () => {
    const location = useLocation()
    const history = useHistory()
    const user = fetchPersistedAuthenticationState()
    if (!user && pageRequiresAuthentication(location.pathname)) {
        history.replace('/')
    }
}

export const useAuthenticationState = () => {
    useEffect(() => {
        useFetchAuthentication()
    })
}
