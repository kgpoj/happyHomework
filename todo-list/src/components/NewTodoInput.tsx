import React, {useState} from 'react';
import {createTodo} from "../api/todoList";
import {checkInputValidation, clearValidation} from "../util";

interface Props {
    refreshPage: () => void
}

function NewTodoInput({refreshPage}: Props) {
    const [newTodo, setNewTodo] = useState('');
    const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        clearValidation(e.currentTarget);
        if (e.key === 'Enter' && checkInputValidation(e.currentTarget)) {
            createTodo(newTodo)
            setNewTodo('');
            refreshPage()
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