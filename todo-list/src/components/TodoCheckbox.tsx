import React from 'react';
import {updateTodo} from "../api/todoList";
import {Checkbox} from "./style";

interface Props {
    refreshPage: () => void,
    todoId: number,
    checked: boolean
}

const TodoCheckbox = ({refreshPage, todoId, checked}: Props) => {
    const handleCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateTodo(todoId, {status: e.target.checked ? 'completed' : 'active'})
        refreshPage();
    }
    return (
        <Checkbox checked={checked} onChange={handleCheckedChange}/>
    );
};

export default TodoCheckbox;