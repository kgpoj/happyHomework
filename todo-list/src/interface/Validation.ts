import {LiteralUnion} from "../util";

export interface Validation {
    type: LiteralUnion<
        | 'maxLength'
        | 'minLength'
        | 'required',
        string
    >;
    value: number | boolean
    message: string
}