import * as React from 'react'
import { HookTestComponent } from './test-utils'
import { useAsync } from './async'
import { render } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'

const asyncStub = jest.fn()

describe('async', () => {
    it('should expose the run function that call the async operation while maintaining the loading state accordingly', async () => {
        asyncStub.mockResolvedValueOnce(true)

        const { result } = renderHook(() => useAsync(asyncStub))

        await act(async () => {
            await result.current.run()
            expect(result.current.loading).toBe(false)
            expect(result.current.data).toBe(true)
        })
    })

    it('should set thrown error in error', async () => {
        asyncStub.mockRejectedValueOnce(false)

        const { result } = renderHook(() => useAsync(asyncStub))

        await act(async () => {
            await result.current.run()
            expect(result.current.loading).toBe(false)
            expect(result.current.error).toBe(false)
        })
    })

    it('the reset function should reset the loading, error and data initial data', async () => {
        asyncStub.mockResolvedValueOnce(true)
        const { result } = renderHook(() => useAsync(asyncStub))

        await act(async () => {
            await result.current.run()
            expect(result.current.loading).toBe(false)
            expect(result.current.data).toBe(true)
            result.current.reset()
            expect(result.current.data).toBeNull()
        })
    })
})
