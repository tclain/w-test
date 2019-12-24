import * as React from 'react'
import './Button.css'

export const Button: React.FC<React.ButtonHTMLAttributes<
    HTMLButtonElement
>> = props => <button className="button" {...props} />
