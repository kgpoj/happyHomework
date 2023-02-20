import React, {useState} from 'react';
import {createTodo} from "../api/todoList";
import Input from "./Input";

interface Props {
    refreshPage: () => void
}

function NewTodoInput({refreshPage}: Props) {
    const [newTodo, setNewTodo] = useState('');
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo(e.target.value)
    };
    const handlePressEnter = () => {
        createTodo(newTodo)
        setNewTodo('');
        refreshPage()
    };
    return (
        <Input
            type={"text"}
            value={newTodo}
            placeholder={'Enter new Todo item'}
            onChange={handleOnChange}
            onPressEnter={handlePressEnter}
            validation={[{type: "required", message: "Todo can not be empty"}]}
        />
    );
}

export default NewTodoInput;