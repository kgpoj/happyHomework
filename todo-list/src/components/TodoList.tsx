import React, {useEffect, useState} from 'react';
import {TodoItem} from "../interface/TodoItem";
import mockTodoData from "../constants/mockTodoData";
import {readTodo, updateTodo} from "../api/todoList";
import NewTodoInput from "./NewTodoInput";

function initState(dataSource: TodoItem[]): { [index: number]: boolean } {
    return dataSource.reduce((total, cur) => ({...total, [cur.id]: false}), {});
}

function TodoList() {
    const [dataSource, setDataSource] = useState<TodoItem[]>(mockTodoData);
    const [refresh, setRefresh] = useState(0);
    const [onEditing, setOnEditing] = useState(initState(dataSource));
    const [editingTodo, setEditingTodo] = useState('');
    useEffect(() => {
        setDataSource(readTodo())
    }, [refresh]);

    function refreshPage() {
        setRefresh(refresh + 1)
    }

    const handleCheckedChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        updateTodo(id, {status: e.target.checked ? 'completed' : 'active'})
        refreshPage();
    }
    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditingTodo(e.target.value)
    };

    const handleLabelDoubleClick = (id: number, data: string) => {
        setOnEditing({...initState(dataSource), [id]: true})
        setEditingTodo(data)
    };

    function saveEditResult(id: number) {
        updateTodo(id, {data: editingTodo})
        refreshPage();
        setOnEditing({...initState(dataSource), [id]: false})
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
        <div>
            <h3>{"What's next?"}</h3>
            <ul>
                {dataSource.map(({data, status, id},) =>
                    <li key={id}>
                        <input
                            type={"checkbox"}
                            name={data}
                            checked={status === 'completed'}
                            onChange={(e) => handleCheckedChange(e, id)}
                        />
                        {onEditing[id]
                            ? <input
                                type={"text"}
                                value={editingTodo}
                                onKeyUp={(e) => handleEditKeyUp(e, id)}
                                onChange={handleEditChange}
                                autoFocus
                                onBlur={() => handleEditBlur(id)}
                            />
                            :
                            <label
                                htmlFor={data}
                                onDoubleClick={() => handleLabelDoubleClick(id, data)}
                            >
                                {data}
                            </label>
                        }
                    </li>
                )}
            </ul>
            <NewTodoInput refreshPage={refreshPage}/>
        </div>
    );
}

export default TodoList;