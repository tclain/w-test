import * as React from 'react'
import { useState, Context } from 'react'
import { contextFromHook } from './context'
import { renderHook, act } from '@testing-library/react-hooks'

// a simple implementation of @unstated/next
describe('contextFromHook', () => {
    it('should provide the return values of a given hook via a context', () => {
        const hookStub = jest.fn(() => useState(0))
        const Context = contextFromHook(hookStub)
        const WrapperStub = ({ children }) => (
            <Context.Provider>{children}</Context.Provider>
        )

        const testedHook = renderHook(Context.use, {
            wrapper: WrapperStub,
        })

        act(() => {
            expect(testedHook.result.current[0]).toBe(0)
            testedHook.result.current[1](1)
        })
        expect(testedHook.result.current[0]).toBe(1)
    })
})
