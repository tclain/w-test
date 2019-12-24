import { useState } from 'react'

export function useAsync<Return>(op: (...args: any[]) => Promise<Return>) {
    const [loading, setLoading] = useState<boolean>()
    const [error, setError] = useState()
    const [data, setData] = useState<Return>()

    const reset = () => {
        setLoading(false)
        setError(null)
        setData(null)
    }
    const run = async (...args) => {
        reset()
        try {
            setLoading(true)
            const result = await op(...args)
            setData(result)
            return result
        } catch (e) {
            setError(e)
        } finally {
            setLoading(false)
        }
    }

    return {
        reset,
        run,
        loading,
        error,
        data,
    }
}
