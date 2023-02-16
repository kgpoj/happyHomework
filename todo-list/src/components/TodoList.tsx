import React, {useEffect, useState} from 'react';
import {TodoItem} from "../interface/TodoItem";
import mockTodoData from "../constants/mockTodoData";
import {createTodo, readTodo, updateTodo} from "../api/todoList";

function initEditState(dataSource: TodoItem[]): { [index: number]: boolean } {
    return dataSource.reduce((total, cur) => ({...total, [cur.id]: false}), {});
}

function TodoList() {
    const [dataSource, setDataSource] = useState<TodoItem[]>(mockTodoData);
    const [refresh, setRefresh] = useState(0);
    const [newTodo, setNewTodo] = useState('');
    const [onEdit, setOnEdit] = useState(initEditState(dataSource));
    const [editingTodo, setEditingTodo] = useState('');
    useEffect(() => {
        setDataSource(readTodo())
    }, [refresh]);

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            createTodo(newTodo)
            setNewTodo('');
            setRefresh(refresh + 1)
        }
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo(e.target.value)
    };
    const handleCheckedChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        updateTodo(id, {status: e.target.checked ? 'completed' : 'active'})
        setRefresh(refresh + 1)
    }
    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditingTodo(e.target.value)
    };

    const handleLabelDoubleClick = (id: number, data: string) => {
        setOnEdit({...initEditState(dataSource), [id]: true})
        setEditingTodo(data)
    };

    function saveEditResult(id: number) {
        updateTodo(id, {data: editingTodo})
        setRefresh(refresh + 1)
        setOnEdit({...initEditState(dataSource), [id]: false})
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
                        <input type={"checkbox"} name={data} checked={status === 'completed'}
                               onChange={(e) => handleCheckedChange(e, id)}/>
                        {onEdit[id]
                            ? <input type={"text"} value={editingTodo} onKeyUp={(e) => handleEditKeyUp(e, id)}
                                     onChange={handleEditChange} autoFocus onBlur={() => handleEditBlur(id)}/>
                            :
                            <label htmlFor={data} onDoubleClick={() => handleLabelDoubleClick(id, data)}>{data}</label>
                        }
                    </li>
                )}
            </ul>
            <input type={"text"} value={newTodo} placeholder={'Enter new Todo item'} onChange={handleInputChange}
                   onKeyUp={handleKeyUp}/>
        </div>
    );
}

export default TodoList;