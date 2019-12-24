import { database } from './database'
import { delay } from '../utils/time'
import { User } from './types'

export interface ILoginInformation {
    email: string
    password: string
}

export class UserNotFoundError extends Error {}
export class LoginError extends Error {}

/**
 * checks if two passwords matches
 *  a little sprinkle of DDD here :-)
 */
const passwordMatches = (pass1: string, pass2: string) => pass1 === pass2

/** check if the user is authenticated */
export const login = async (information: ILoginInformation) => {
    await delay(1000)
    const user = database.users[information.email]
    if (!user) throw new UserNotFoundError()
    if (!passwordMatches(user.password, information.password))
        throw new LoginError()
    persistAuthentication(user)
    return user
}

/** logout, simply consisting of erasing the persisted auth token */
export const logout = () => persistAuthentication(null)

/** the uniq key used to persist the authentication operation */
export const AUTH_KEY = 'AUTH_KEY'

/** persists the authentication to the local storage */
export const persistAuthentication = (token: User) => {
    window.localStorage.setItem(AUTH_KEY, JSON.stringify(token))
}

/** fetch if a authentication token is stored in the local storage */
export const fetchPersistedAuthenticationState = (): User => {
    return JSON.parse(window.localStorage.getItem(AUTH_KEY))
}
