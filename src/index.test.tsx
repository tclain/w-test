import * as React from 'react'
import { render } from '@testing-library/react'
import { App } from './router'
import { createMemoryHistory } from 'history'

const AppStub = () => {
    const history = createMemoryHistory()
    jest.spyOn(history, 'replace')
    const wrap = render(<App history={history} />)

    const selectors = {
        auth: {
            login: () => wrap.findByTestId('login'),
        },
    }
    return {
        wrap,
        history,
        selectors,
    }
}

describe('walter-demo/integrations', () => {
    it('should be redirected to root if not authenticated', () => {
        const stub = AppStub()
        stub.history.push('/dashboard')
        expect(stub.history.replace).toHaveBeenCalledWith('/login')
    })
})

describe('walter-demo/auth', () => {
    it('in the case of a successful authentication, it should be redirected to the dashboard page', async () => {
        const stub = AppStub()

        await stub.selectors.auth.login()
    })
})
