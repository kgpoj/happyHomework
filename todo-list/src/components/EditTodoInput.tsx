import React from 'react';
import {updateTodo} from "../api/todoList";
import {checkInputValidation, clearValidation} from "../util";

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

    const handleEditKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, id: number) => {
        clearValidation(e.currentTarget)
        if (e.key === 'Enter' && checkInputValidation(e.currentTarget)) {
            saveEditResult(id);
        }
    };

    const handleEditBlur = (e: React.FocusEvent<HTMLInputElement>, id: number) => {
        if (checkInputValidation(e.currentTarget)) {
            saveEditResult(id);
        }
    };
    return (
        <input
            type={"text"}
            value={value}
            required
            onKeyUp={(e) => handleEditKeyUp(e, todoId)}
            onChange={onChange}
            autoFocus
            onBlur={(e) => handleEditBlur(e, todoId)}
        />
    );
}

export default EditTodoInput;