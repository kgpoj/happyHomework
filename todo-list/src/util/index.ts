export function checkInputValidation(inputElement: HTMLInputElement): boolean {
    if (!inputElement.checkValidity()) {
        const validityState = inputElement.validity;
        if (validityState.valueMissing) {
            inputElement.setCustomValidity("Todo can not be empty");
        }
        inputElement.reportValidity()
        return false
    }
    return true
}

export function clearValidation(inputElement: HTMLInputElement) {
    inputElement.setCustomValidity('')
}