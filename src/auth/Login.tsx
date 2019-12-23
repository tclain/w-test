import * as React from 'react'
import './Login.css'
import { Button } from '../components/Button'
import { useForm } from '../utils/forms'
import { Input } from '../components/Input'
import { definedAndNotVoid } from '../utils/string'
import { ifFalsy } from '../utils/fp'
import { login, ILoginInformation } from '../api/auth'
import { useHistory } from 'react-router'
import { useAsync } from '../utils/async'

export const useLogin = () => {
    const history = useHistory()
    const operation = useAsync(async (loginInformation: ILoginInformation) => {
        await login(loginInformation)
        history.push('/dashboard')
    })
    return operation
}

export const Login = () => {
    // typesafe and auto completed by the ide !
    const { inputProps, submit, validationState } = useForm<ILoginInformation>({
        defaults: { email: '', password: '' },
        validations: {
            email: ifFalsy(definedAndNotVoid, 'the email must be valid'),
            password: ifFalsy(definedAndNotVoid, 'the password must be set'),
        },
    })

    const { run, loading, error } = useLogin()

    return (
        <div className="login-page" data-testid="login">
            <form onSubmit={submit(run)} className="login">
                <Input type="text" label="email" {...inputProps('email')} />
                <Input
                    type="password"
                    label="password"
                    {...inputProps('password')}
                />
                <Button
                    type="submit"
                    disabled={validationState.formInError || loading}
                >
                    Login
                </Button>
                {error && <div>Impossible to login</div>}
            </form>
        </div>
    )
}
