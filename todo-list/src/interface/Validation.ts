import {LiteralUnion} from "../util";

export interface Validation {
    type: LiteralUnion<
        | 'maxlength'
        | 'minlength'
        | 'required',
        string
    >;
    message: string
}