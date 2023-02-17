import React, {useState} from 'react';
import {deleteTodo} from "../api/todoList";

interface TodoDetailProps {
    todoId: number,
    onDoubleClick: () => void,
    data: string,
    refreshPage: () => void,
    completed: boolean
}

function TodoDetail({ todoId, onDoubleClick, data, refreshPage, completed }: TodoDetailProps) {
    const [onHovering, setOnHovering] = useState(false);
    const handleDelete = (id: number) => {
        deleteTodo(id)
        refreshPage();
    };
    return (
        <span
            onMouseEnter={() => setOnHovering(true)}
            onMouseLeave={() => setOnHovering(false)}
        >
            <span onDoubleClick={onDoubleClick}>
                {completed ? <del>{data}</del> : data}
            </span>
            {onHovering && <button onClick={() => handleDelete(todoId)}>x</button>}
        </span>
    );
}

export default TodoDetail;