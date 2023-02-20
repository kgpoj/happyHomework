import React, {useState} from 'react';
import {createTodo} from "../api/todoList";

interface Props {
    refreshPage: () => void
}

function NewTodoInput({refreshPage}: Props) {
    const [newTodo, setNewTodo] = useState('');
    const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const inputElement = e.currentTarget
        inputElement.setCustomValidity('')
        if (e.key === 'Enter') {
            if (!inputElement.checkValidity()) {
                const validityState = inputElement.validity;
                if (validityState.valueMissing) {
                    inputElement.setCustomValidity("Todo can not be empty");
                }
                inputElement.reportValidity()
            } else {
                createTodo(newTodo)
                setNewTodo('');
                refreshPage()
            }
        }
    };
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo(e.target.value)
    };
    return (
        <input
            type={"text"}
            value={newTodo}
            placeholder={'Enter new Todo item'}
            required
            onChange={handleOnChange}
            onKeyUp={handleOnKeyUp}
        />
    );
}

export default NewTodoInput;