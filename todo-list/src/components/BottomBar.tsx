import React from 'react';
import styled from "styled-components";
import {deleteCompleted} from "../api/todoList";
import {Button} from "./style";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`
const OutlinedButton = styled(Button)`
  background-color: transparent;
  color: #8d8282;
  height: 30px;
  width: auto;
  font-size: 15px;
  
  &:hover {
    background-color: transparent;
    box-shadow: 0 3px 6px 0 rgb(0 0 0 / 12%);
  }
`

interface BottomBarProps {
    todoNum: number,
    onFilter: (value: (((prevState: string) => string) | string)) => void,
    refreshPage: () => void
}

function BottomBar({todoNum, onFilter, refreshPage}: BottomBarProps) {
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
            <OutlinedButton onClick={handleOnClick}>Clear Completed</OutlinedButton>
        </StyledWrapper>
    );
}

export default BottomBar;