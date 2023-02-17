import React from 'react';
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`
interface BottomBarProps {
    todoNum: number
}

function BottomBar({todoNum}: BottomBarProps) {
    return (
        <StyledWrapper>
            <div>{todoNum} items left</div>
            <div>
                <input type="radio" id="All" name="todoFilter" value="All"/>
                <label htmlFor="All">All</label>
                <input type="radio" id="Active" name="todoFilter" value="Active"/>
                <label htmlFor="Active">Active</label>
                <input type="radio" id="Completed" name="todoFilter" value="Completed"/>
                <label htmlFor="Completed">Completed</label>
            </div>
            <button>Clear Completed</button>
        </StyledWrapper>
    );
}

export default BottomBar;