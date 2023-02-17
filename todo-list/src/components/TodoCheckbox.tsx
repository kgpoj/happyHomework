import React from 'react';
import {updateTodo} from "../api/todoList";

interface Props {
    refreshPage: () => void,
    checkId: number,
    checked: boolean
}
function TodoCheckbox({refreshPage, checkId, checked}: Props) {
    const handleCheckedChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        updateTodo(id, {status: e.target.checked ? 'completed' : 'active'})
        refreshPage();
    }
    return (
        <input
            type={"checkbox"}
            checked={checked}
            onChange={(e) => handleCheckedChange(e, checkId)}
        />
    );
}

export default TodoCheckbox;