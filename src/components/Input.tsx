import * as React from 'react'
import { definedAndNotVoid } from '../utils/string'
import './Input.css'

export interface IInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    error?: string
    label?: string
    onChange: (value: string) => void
}

/**
 * A semantically compatible input component that adds the ability to display a label and a validation state
 */
export const Input: React.FC<IInputProps> = ({
    error,
    name,
    label,
    onChange,
    ...props
}) => {
    const validError = definedAndNotVoid(error)
    return (
        <div className="input">
            <label htmlFor={name}>{label}</label>
            <input
                name={name}
                // we extract the value by convenience for the user
                onChange={e => onChange(e.target.value)}
                {...props}
            />
            <div className={'error-state'}>{error}</div>
        </div>
    )
}
