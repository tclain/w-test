# test technique

Ce test propose de creer une application react permettant de gerer une liste de propriétés appartenant a un utilisateur.

## Tech stack

React, React-dom : latest
state management: for the need of this experience, hooks and context. In a large scale production app, mobx would be recommended to take advantage of the built-in dependency tracker.
Typescript, pour une experience de developpement aggréable
tests: jest, ts-jest, @testing-library/react
react-router

## tests

Some strategic tests are exhibited to show how I usually work. In real life projet, I strive for 90%+ code coverage of **impactful, integrations tests**.

-   npm t to run tem

## deployement

A git hook is deployed on netlify, automatically building master on each commit and deploying the code in [https://friendly-johnson-661ee9.netlify.com/login](here)

test account is tclain@gmail.com / tclain

## Structure

-   `src/api`: the outer bound of the application. right now it is mock data (`api/index.ts` and `api/database.ts`). Irl this would be replaced by the http client calls.
-   `src/components`: 'Dumb components' used throughout the application
-   `src/auth`: all thing relative to log-in and log-out

## Features implemented

-   login, logout
-   fetching the list of properties of the user
-

## Leveraged abstractions

### Async

In every serious spa app, we need to communicate with the backend, these async utils abstract away the notion of loading, error, and could be extended to

A simple hook `useAsync` can then be used to run the async operation from other hooks.

```ts
const operation = useAsync(async (loginInformation: ILoginInformation) => {
    const user = await login(loginInformation)
    setUser(user)
    history.push('/dashboard')
})
return operation
```

operation contains `loading`, `error`, and the `run`method among others that do triggers. it could be compared to a cold, one-off observable, triggerable on demand.

### Form

Form handling in certainly one of the most cumbersome thing to manage in a react app.

this code propose a miniminalistic `useForm` hook managing, fields values, change handler, reset, and basic validation.

A great care has been given in to a simple and configurable api.

```ts
const { inputProps, submit, validationState } = useForm<ILoginInformation>({
    defaults: { email: '', password: '' },
    validations: {
        email: ifFalsy(looksLikeAnEmail, 'the email must be valid'),
        password: ifFalsy(definedAndNotVoid, 'the password must be set'),
    },
})
```

Validations returns undefined if okay, or a message error if something's wrong.
the view component can be used as such:

```ts
<form onSubmit={submit(run)} className="login">
    <Input type="text" label="email" {...inputProps('email')} />
    <Input type="password" label="password" {...inputProps('password')} />
    <Button type="submit" disabled={validationState.formInError || loading}>
        Login
    </Button>
    {error && <div>Impossible to login</div>}
</form>
```

All of these bricks are meant to be low-level. Given some maturity reached in the product scope, these hooks can br combned to form more sophisticated abstraction (view independant) that could manage end-to-end the lifecycle entity (with crud operations, retry logic on errors, ...).
