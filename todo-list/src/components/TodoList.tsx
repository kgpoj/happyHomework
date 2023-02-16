import React, {useEffect, useState} from 'react';
import {TodoItem} from "../interface/TodoItem";
import mockTodoData from "../constants/mockTodoData";
import {createTodo, readTodo, updateTodo} from "../api/todoList";


function TodoList() {
    const [dataSource, setDataSource] = useState<TodoItem[]>(mockTodoData);
    const [refresh, setRefresh] = useState(0);
    useEffect(() => {
        setDataSource(readTodo())
    }, [refresh]);

    const [newTodo, setNewTodo] = useState('');
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
    };
    return (
        <div>
            <h3>{"What's next?"}</h3>
            <ul>
                {dataSource.map(({data, status, id},) =>
                    <li key={id}>
                        <input type={"checkbox"} name={data} checked={status === 'completed'}
                               onChange={(e) => handleCheckedChange(e, id)}/>
                        <label htmlFor={data}>{data}</label>
                    </li>
                )}
            </ul>
            <input type={"text"} value={newTodo} placeholder={'Enter new Todo item'} onChange={handleInputChange}
                   onKeyUp={handleKeyUp}/>
        </div>
    );
}

export default TodoList;