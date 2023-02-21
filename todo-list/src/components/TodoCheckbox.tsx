import React from 'react';
import {updateTodo} from "../api/todoList";
import {Checkbox} from "./style";

interface Props {
    refreshPage: () => void,
    todoId: number,
    checked: boolean
}

function TodoCheckbox({refreshPage, todoId, checked}: Props) {
    const handleCheckedChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        updateTodo(id, {status: e.target.checked ? 'completed' : 'active'})
        refreshPage();
    }
    return (
        <Checkbox
            type={"checkbox"}
            checked={checked}
            onChange={(e) => handleCheckedChange(e, todoId)}
        />
    );
}

export default TodoCheckbox;