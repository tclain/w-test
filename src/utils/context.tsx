import * as React from 'react'
import { createContext, useContext } from 'react'

/** a simple mutable interface to a value in context, inspired by unstated */
export function contextFromHook<StateManager>(hook: () => StateManager) {
    const InnerContext = createContext<StateManager>(null)
    return {
        Provider: ({ children }) => (
            <InnerContext.Provider value={hook()} children={children} />
        ),
        use: () => {
            return useContext(InnerContext)
        },
    }
}
