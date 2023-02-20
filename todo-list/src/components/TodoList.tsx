import React, {useEffect, useState} from 'react';
import {TodoItem} from "../interface/TodoItem";
import mockTodoData from "../constants/mockTodoData";
import {readTodo} from "../api/todoList";
import NewTodoInput from "./NewTodoInput";
import EditTodoInput from "./EditTodoInput";
import TodoCheckbox from "./TodoCheckbox";
import TodoDetail from "./TodoDetail";
import styled from "styled-components";
import BottomBar from "./BottomBar";

function initState(dataSource: TodoItem[]): { [index: number]: boolean } {
    return dataSource.reduce((total, cur) => ({...total, [cur.id]: false}), {});
}

const StyledWrapper = styled.div`
  width: 500px;
  margin: 10px auto;
  border: 1px solid rgba(5, 5, 5, 0.06);
  box-shadow: 0 3px 6px 0 rgb(0 0 0 / 12%);
`;

function TodoList() {
    const [dataSource, setDataSource] = useState<TodoItem[]>(mockTodoData);
    const [refresh, setRefresh] = useState(0);
    const [onEditing, setOnEditing] = useState(initState(dataSource));
    const [editingTodo, setEditingTodo] = useState('');
    const [filterOption, setFilterOption] = useState('All');
    useEffect(() => {
        setDataSource(readTodo())
    }, [refresh]);

    function refreshPage() {
        setOnEditing(initState(dataSource))
        setRefresh(refresh + 1)
    }

    const handleDetailDoubleClick = (id: number, data: string) => {
        setOnEditing({...initState(dataSource), [id]: true})
        setEditingTodo(data)
    };

    function filtered(dataSource: TodoItem[]): TodoItem[] {
        if (filterOption === 'All') {
            return dataSource
        } else if (filterOption === 'Active') {
            return dataSource.filter(item => item.status === 'active')
        } else {
            return dataSource.filter(item => item.status === 'completed')
        }
    }

    return (
        <StyledWrapper>
            <h3>{"What's next?"}</h3>
            <ul>
                {filtered(dataSource).map(({data, status, id},) =>
                    <li key={id}>
                        <TodoCheckbox refreshPage={refreshPage} checked={status === 'completed'} todoId={id}/>
                        {onEditing[id]
                            ?
                            <EditTodoInput
                                value={editingTodo}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingTodo(e.target.value)}
                                todoId={id}
                                refreshPage={refreshPage}
                            />
                            :
                            <TodoDetail
                                completed={status === 'completed'}
                                todoId={id}
                                onDoubleClick={() => handleDetailDoubleClick(id, data)}
                                data={data}
                                refreshPage={refreshPage}
                            />
                        }
                    </li>
                )}
            </ul>
            <NewTodoInput refreshPage={refreshPage}/>
            <BottomBar todoNum={dataSource.length} onFilter={setFilterOption} refreshPage={refreshPage}/>
        </StyledWrapper>
    );
}

export default TodoList;