import React, {useState} from 'react';
import {TodoItem} from "../interface/TodoItem";

interface Props {
    title: string,
    dataSource: TodoItem[],
    onUpdate: (value: TodoItem[]) => void
}

function TodoList({title, dataSource, onUpdate}: Props) {
    const [newTodo, setNewTodo] = useState('');
    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const newTodoItem = {
                data: newTodo,
                status: 'active'
            };
            onUpdate([...dataSource, newTodoItem]);
            setNewTodo('');
        }
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo(e.target.value)
    };
    const handleCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetItem = e.target.name;
        const newTodoItems = dataSource.map(item => {
            if (item.data === targetItem) {
                return {
                    data: item.data,
                    status: e.target.checked ? 'completed' : 'active'
                }
            }
            return item
        })
        onUpdate(newTodoItems);
    };
    return (
        <div>
            <h3>{title}</h3>
            <ul>
                {dataSource.map(({data, status}, index) =>
                    <li key={index}>
                        <input type={"checkbox"} name={data} checked={status === 'completed'}
                               onChange={handleCheckedChange}/>
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