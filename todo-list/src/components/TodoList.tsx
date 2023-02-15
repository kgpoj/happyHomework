import React from 'react';
import {TodoItem} from "../interface/TodoItem";

interface Props {
    title: string,
    dataSource: TodoItem[],
    onUpdate: (value: TodoItem[]) => void
}

function TodoList({title, dataSource, onUpdate}: Props) {
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
        </div>
    );
}

export default TodoList;