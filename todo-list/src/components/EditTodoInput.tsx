import React from 'react';
import {updateTodo} from "../api/todoList";
import Input from "./Input";

interface Props {
    refreshPage: () => void,
    todoId: number,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function EditTodoInput({refreshPage, todoId, value, onChange}: Props) {
    function saveEditResult(id: number) {
        updateTodo(id, {data: value})
        refreshPage();
    }

    const handleBlur = () => {
        saveEditResult(todoId);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e)
    };
    const handlePressEnter = () => {
        saveEditResult(todoId);
    };
    return (
        <Input
            type={"text"}
            value={value}
            onPressEnter={handlePressEnter}
            onChange={handleChange}
            validation={[{type: "required", message: "Todo can not be empty"}]}
            validateOnBlur
            autoFocus
            onBlur={handleBlur}
        />
    );
}

export default EditTodoInput;