import React, {useState} from 'react';
import {createTodo} from "../api/todoList";

interface Props {
    refreshPage: () => void
}

function NewTodoInput({ refreshPage }: Props) {
    const [newTodo, setNewTodo] = useState('');
    const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
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
            onChange={handleOnChange}
            onKeyUp={handleOnKeyUp}
        />
    );
}

export default NewTodoInput;