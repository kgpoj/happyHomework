import {Validation} from "../interface/Validation";

export function checkInputValidation(inputElement: HTMLInputElement, validation: Validation[] | undefined): boolean {
    if (!validation || inputElement.checkValidity()) {
        return true
    }
    const validateMessagesMap: {[index: string]: string} = {}
    validation.forEach(item => validateMessagesMap[item.type] = item.message)
    const validityState = inputElement.validity;
    if (validityState.valueMissing) {
        inputElement.setCustomValidity(validateMessagesMap['required']);
    }
    inputElement.reportValidity()
    return false
}

export function clearValidation(inputElement: HTMLInputElement) {
    inputElement.setCustomValidity('')
}

export type LiteralUnion<T extends U, U> = T | (U & {});