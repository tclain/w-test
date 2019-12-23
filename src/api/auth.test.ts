import { mockedEnvironment } from '../utils/test-utils'
const { setItem } = mockedEnvironment()

import { login, AUTH_KEY, logout } from './auth'

describe('login', () => {
    it('[mockdata] should return an exception of the authentication is incorrect', async () => {
        try {
            await login({
                email: 'inexistant',
                password: 'nope',
            })
        } catch (e) {
            expect(e).toBeDefined()
        }
    })
    it('should persist the returned  user', async () => {
        // with a real api, mock the api directly
        await login({
            email: 'tclain@gmail.com',
            password: 'tclain',
        })

        expect(window.localStorage.getItem(AUTH_KEY)).toEqual(
            '{"id":"1","email":"tclain@gmail.com","password":"tclain"}'
        )
    })
})

describe('logoout', () => {
    it('should clear the persisted the returned  user', async () => {
        // with a real api, mock the api directly
        await login({
            email: 'tclain@gmail.com',
            password: 'tclain',
        })

        logout()
        expect(window.localStorage.getItem(AUTH_KEY)).toEqual('null')
    })
})
