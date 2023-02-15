import React from 'react';
import {TodoItem} from "../interface/TodoItem";

interface Props {
    title: string,
    dataSource: TodoItem[],
}
function TodoList({title, dataSource}: Props) {
    const handleCheckedChange = () => {

    };
    return (
        <div>
            <h3>{title}</h3>
            <ul>
                {dataSource.map(({data, status}, index) =>
                    <li key={index}>
                        <input type={"checkbox"} name={data} checked={status === 'completed'} onChange={handleCheckedChange}/>
                        <label htmlFor={data}>{data}</label>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default TodoList;