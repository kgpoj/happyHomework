import React from 'react';
import styled from "styled-components";
import {deleteCompleted} from "../api/todoList";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`
interface BottomBarProps {
    todoNum: number,
    onFilter: (value: (((prevState: string) => string) | string)) => void,
    refreshPage: () => void
}

function BottomBar({ todoNum, onFilter, refreshPage }: BottomBarProps) {
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFilter(e.target.value)
    };
    const handleOnClick = () => {
        deleteCompleted()
        refreshPage()
    };
    return (
        <StyledWrapper>
            <div>{todoNum} items left</div>
            <div onChange={handleOnChange}>
                <input type="radio" id="All" name="todoFilter" value="All" defaultChecked/>
                <label htmlFor="All">All</label>
                <input type="radio" id="Active" name="todoFilter" value="Active"/>
                <label htmlFor="Active">Active</label>
                <input type="radio" id="Completed" name="todoFilter" value="Completed"/>
                <label htmlFor="Completed">Completed</label>
            </div>
            <button onClick={handleOnClick}>Clear Completed</button>
        </StyledWrapper>
    );
}

export default BottomBar;