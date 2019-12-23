import { renderHook, act } from '@testing-library/react-hooks'
import { useForm } from './forms'

describe('useForm', () => {
    it('should init the form with the default value', () => {
        const { result } = renderHook(() =>
            useForm({
                defaults: { field1: 'hello' },
                validations: {},
            })
        )

        act(() => {
            expect(result.current.form).toEqual({
                field1: 'hello',
            })
        })
    })

    describe('inputProps', () => {
        const validationField1 = jest.fn(string =>
            string.length > 0 ? 'error' : undefined
        )
        const { result } = renderHook(() =>
            useForm({
                defaults: { field1: 'hello', field2: '' },
                validations: { field1: validationField1 },
            })
        )

        it('props should return the current value of a field', () => {
            act(() => {
                expect(result.current.inputProps('field1').value).toEqual(
                    'hello'
                )
                expect(result.current.inputProps('field1').error).toBeTruthy()
            })
        })
    })

    it('reset should apply the default value of a form', () => {})
})
