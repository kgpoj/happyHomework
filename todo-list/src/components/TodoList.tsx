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

const Header = styled.h3`
  border-bottom: 3px solid #f5f5f5;
  margin: 0;
  padding: 12px 5px;
  display: flex;
  justify-content: space-between;
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`
const ListItem = styled.li`
  height: 50px;
  padding: 0 5px;
  border-bottom: 2px solid #f5f5f5;
  display: flex;
  align-items: center;
  font-size: 20px;

  &:hover {
    box-shadow: 0 3px 6px 0 rgb(0 0 0 / 12%);
  }
`

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
            <Header>{"What's next?"}<NewTodoInput refreshPage={refreshPage}/></Header>
            <List>
                {filtered(dataSource).map(({data, status, id},) =>
                    <ListItem key={id}>
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
                    </ListItem>
                )}
            </List>
            <BottomBar todoNum={dataSource.length} onFilter={setFilterOption} refreshPage={refreshPage}/>
        </StyledWrapper>
    );
}

export default TodoList;