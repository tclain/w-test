import { MapOf } from '../api/types'
import { useState, useCallback } from 'react'
import { definedAndNotVoid } from './string'
import fromPairs from 'lodash.frompairs'
import toPairs from 'lodash.topairs'

export type Validation = (value) => string
export type Validations<Form extends {}> = MapOf<Validation, keyof Form>

export interface IFormConfig<Form extends {}> {
    defaults: Form
    validations: Partial<Validations<Form>>
}

export interface IValidationState<Form extends {}> {
    formInError: boolean
    fields: Form
}

/**
 *
 * @param form the object of values to validate
 * @param validations the map of validations defined by the developpers
 */
export function computeValidationState<Form extends {}>(
    form: Form,
    validations: IFormConfig<Form>['validations'],
    touched: {}
): IValidationState<Form> {
    // convert the validation map to an array of [key, boolean] indicates the validation state of the given field
    const validationsStates = toPairs(form).map(([field, fieldValue]) => [
        field,
        // if the validation exists compute the validation state of the field, defaults to true
        validations[field]
            ? touched[field] && validations[field](fieldValue)
            : true,
    ])

    // if one of the fields is in error, the entire form is in error
    const formInError = validationsStates.some(([_, validated]) =>
        definedAndNotVoid(validated)
    )

    // returns the validation states of all fields individually and the overall form
    return {
        fields: fromPairs(validationsStates),
        formInError,
    }
}

/**
 * a simple helper to manage elegantly thus simply forms in pure react
 * @param {IFormConfig} config, the default values of the form as well as the mandatory validation associated
 *
 */
export function useForm<Form extends {}>(config: IFormConfig<Form>) {
    const [form, setForm] = useState(config.defaults)
    // a field must be in error only if it has been touched
    const [touched, setTouched] = useState({})
    // at any given state compute the validation state of the fields and the form
    const validationState = computeValidationState(
        form,
        config.validations,
        touched
    )
    // reset the form to the initial valuest
    const reset = useCallback(() => {
        setForm(config.defaults)
        setTouched({})
    }, [form])
    const submit = useCallback(
        callback => e => {
            e.preventDefault()
            if (!validationState.formInError) callback(form)
        },
        [form]
    )

    // a curried field value setter that let the developper to easily change the value of a field in the form
    const setField = (fieldName: keyof Form) => value => {
        setForm({ ...form, [fieldName]: value })
        setTouched({ ...touched, [fieldName]: true })
    }

    // generates the necessary props for an input that manages
    const inputProps = useCallback(
        (fieldName: keyof Form) => ({
            value: form[fieldName],
            onChange: setField(fieldName),
            error: validationState.fields[fieldName],
        }),
        [form]
    )

    return {
        form,
        reset,
        submit,
        validationState,
        setField,
        inputProps,
    }
}
