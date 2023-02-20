import {LiteralUnion} from "../util";
import type {InputHTMLAttributes, KeyboardEventHandler,} from 'react';
import {Validation} from "./Validation";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type?: LiteralUnion<
        | 'checkbox'
        | 'text',
        string
    >;
    onPressEnter?: KeyboardEventHandler<HTMLInputElement>;
    validation?: Validation[];
    validateOnBlur?: boolean
}