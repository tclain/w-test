import { User, MapOf } from './types'
import { database } from './database'

export interface ILoginInformation {
    email: string
    password: string
}

export class UserNotFoundError extends Error {}
export class LoginError extends Error {}

/** check if the user exists the user if present */
const userIsPresent = (objects: MapOf<User>, id: string): boolean =>
    Boolean(objects[id])

/**
 * checks if two passwords matches
 *  a little sprinkle of DDD here :-)
 */
const passwordMatches = (pass1: string, pass2: string) => pass1 === pass2

/** check if the user is authenticated */
export const login = (information: ILoginInformation) => {
    const user = database.users[information.email]
    if (!user) throw new UserNotFoundError()
    if (!passwordMatches(user.password, information.password))
        throw new LoginError()
    // the simplest token here is the email
    persistAuthentication(user.email)
    return Promise.resolve(true)
}

/** logout, simply consisting of erasing the persisted auth token */
export const logout = () => persistAuthentication(null)

/** the uniq key used to persist the authentication operation */
const AUTH_KEY = 'AUTH'

/** persists the authentication to the local storage */
export const persistAuthentication = (token: string) => {
    window.localStorage.setItem(AUTH_KEY, token)
}

/** fetch if a authentication token is stored in the local storage */
export const fetchPersistedAuthenticationState = (): string => {
    return window.localStorage.getItem(AUTH_KEY)
}
