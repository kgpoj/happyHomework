import React, {useLayoutEffect, useState} from 'react';
import {TodoItem} from "../interface/TodoItem";
import mockTodoData from "../constants/mockTodoData";
import {readTodo} from "../api/todoList";
import NewTodoInput from "./NewTodoInput";
import styled from "styled-components";
import BottomBar from "./BottomBar";
import ListItem from "./ListItem";

const StyledWrapper = styled.div`
  padding: 5px;
  width: 500px;
  margin: 10px auto;
  border: 1px solid rgba(5, 5, 5, 0.06);
  box-shadow: 0 3px 6px 0 rgb(0 0 0 / 12%);
`;

const Header = styled.h3`
  border-bottom: 3px solid #f5f5f5;
  margin: 0;
  padding: 12px 0;
  display: flex;
  justify-content: space-between;
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const TodoList = () => {
    const [dataSource, setDataSource] = useState<TodoItem[]>(mockTodoData);
    const [refresh, setRefresh] = useState(0);
    const [filterOption, setFilterOption] = useState('All');
    useLayoutEffect(() => {
        setDataSource(readTodo())
    }, [refresh]);

    const refreshPage = () => {
        setRefresh(refresh + 1)
    };

    const filtered = (dataSource: TodoItem[]): TodoItem[] => {
        if (filterOption === 'All') {
            return dataSource
        } else if (filterOption === 'Active') {
            return dataSource.filter(item => item.status === 'active')
        } else {
            return dataSource.filter(item => item.status === 'completed')
        }
    };


    return (
        <StyledWrapper>
            <NewTodoInput refreshPage={refreshPage}/>
            <Header>{"What's next?"}</Header>
            <List>
                {filtered(dataSource).map(({data, status, id},) =>
                    <ListItem key={id} todoId={id} todoData={data} todoStatus={status} refreshPage={refreshPage}/>
                )}
            </List>
            <BottomBar todoNum={dataSource.length} onFilter={setFilterOption} refreshPage={refreshPage}/>
        </StyledWrapper>
    );
};

export default TodoList;