import React from 'react';
import {InputProps} from "../interface/Input";
import {checkInputValidation, clearValidation} from "../util";
import {Validation} from "../interface/Validation";


function getValidationProps(validation: Validation[] | undefined) {
    const validationProps: { [index: string]: boolean } = {}
    if (validation) {
        validation.forEach(item => validationProps[item.type] = true)
    }
    return validationProps;
}

function Input(props: InputProps) {
    const {onPressEnter, onKeyDown, onBlur, onChange, validation, validateOnBlur = false, ...rest} = props
    const validationProps = getValidationProps(validation);
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (onPressEnter && e.key === 'Enter' && checkInputValidation(e.currentTarget, validation)) {
            onPressEnter(e);
        }
        onKeyDown?.(e);
    };
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (validateOnBlur && checkInputValidation(e.currentTarget, validation)) {
            onBlur?.(e)
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearValidation(e.currentTarget)
        onChange?.(e)
    };
    return (
        <input onKeyDown={handleKeyDown} onBlur={handleBlur} onChange={handleChange} {...validationProps} {...rest}/>
    );
}

export default Input;