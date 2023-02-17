import React, {useEffect, useState} from 'react';
import {TodoItem} from "../interface/TodoItem";
import mockTodoData from "../constants/mockTodoData";
import {readTodo} from "../api/todoList";
import NewTodoInput from "./NewTodoInput";
import EditTodoInput from "./EditTodoInput";
import TodoCheckbox from "./TodoCheckbox";

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
        setOnEditing(initState(dataSource))
        setRefresh(refresh + 1)
    }

    const handleLabelDoubleClick = (id: number, data: string) => {
        setOnEditing({...initState(dataSource), [id]: true})
        setEditingTodo(data)
    };

    return (
        <div>
            <h3>{"What's next?"}</h3>
            <ul>
                {dataSource.map(({data, status, id},) =>
                    <li key={id}>
                        <TodoCheckbox refreshPage={refreshPage} checked={status === 'completed'} checkId={id}/>
                        {onEditing[id]
                            ?
                            <EditTodoInput
                                value={editingTodo}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingTodo(e.target.value)}
                                editId={id}
                                refreshPage={refreshPage}
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