import { useEffect } from 'react'
import { useFetchAuthentication } from '../auth/user'

export const useStartup = () => {
    useFetchAuthentication()
}
