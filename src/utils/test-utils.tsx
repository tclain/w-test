import * as React from 'react'
import { AUTH_KEY } from '../api'

/**
 * we use some delay to fake an api response but in test, we want to remove the delays to have deterministic tests
 */
export const mockedEnvironment = (user = null) => {
    const delay = jest.fn().mockResolvedValue(true)
    const setItem = jest.fn()
    const getItem = jest.fn(key => (key === AUTH_KEY ? user : null))

    jest.mock('./time.ts', () => ({ delay }))

    jest.mock('./storage', () => ({
        setItem,
        getItem,
    }))

    return { delay, setItem, getItem }
}

/** an utility thawt use the render prop pattern to facilitate hooks testing
 * a mock is provided,
 */
export const HookTestComponent = hook => {
    const returnValues = jest.fn(hookResults => <div>'rendered'</div>)
    const HookComponent = () => {
        const hookReturns = hook()
        return returnValues(hookReturns)
    }

    return { returnValues, HookComponent }
}
