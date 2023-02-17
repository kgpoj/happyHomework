import React from 'react';
import {updateTodo} from "../api/todoList";

interface Props {
    refreshPage: () => void,
    editId: number,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function EditTodoInput({refreshPage, editId, value, onChange}: Props) {
    function saveEditResult(id: number) {
        updateTodo(id, {data: value})
        refreshPage();
    }

    const handleEditKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, id: number) => {
        if (e.key === 'Enter') {
            saveEditResult(id);
        }
    };

    const handleEditBlur = (id: number) => {
        saveEditResult(id);
    };
    return (
        <input
            type={"text"}
            value={value}
            onKeyUp={(e) => handleEditKeyUp(e, editId)}
            onChange={onChange}
            autoFocus
            onBlur={() => handleEditBlur(editId)}
        />
    );
}

export default EditTodoInput;