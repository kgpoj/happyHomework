import React, {useEffect, useState} from 'react';
import {TodoItem} from "../interface/TodoItem";
import mockTodoData from "../constants/mockTodoData";
import {readTodo, updateTodo} from "../api/todoList";
import NewTodoInput from "./NewTodoInput";
import EditTodoInput from "./EditTodoInput";

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

    const handleCheckedChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        updateTodo(id, {status: e.target.checked ? 'completed' : 'active'})
        refreshPage();
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
                        <input
                            type={"checkbox"}
                            name={data}
                            checked={status === 'completed'}
                            onChange={(e) => handleCheckedChange(e, id)}
                        />
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