import React, {useState} from 'react';
import {deleteTodo} from "../api/todoList";
import styled from "styled-components";
import deleteImg from '../delete.png'

interface TodoDetailProps {
    todoId: number,
    onDoubleClick: (data: string) => void,
    todoData: string,
    refreshPage: () => void,
    completed: boolean,
}

const StyledWrapper = styled.span`
  display: flex;
  flex: 1;
  cursor: pointer;
  height: 100%;
  align-items: center;

  span {
    flex: 1;

    del {
      color: #d4d4d4;
    }
  }

  button {
    color: transparent;
    width: 23px;
    height: 23px;
    cursor: pointer;
    background: url(${deleteImg});
    border: none;
    border-radius: 50%;
    transition: all .2s cubic-bezier(.645, .045, .355, 1);

    &:hover {
      box-shadow: 0 3px 6px 0 rgb(0 0 0 / 12%);
    }

  }
`

const TodoDetail = ({todoId, onDoubleClick, todoData, refreshPage, completed}: TodoDetailProps) => {
    const [onHovering, setOnHovering] = useState(false);
    const handleDelete = () => {
        deleteTodo(todoId)
        refreshPage();
    };
    const handleDoubleClick = () => {
        onDoubleClick(todoData)
    }
    const showDeleteBtn = () => setOnHovering(true);
    const hiddenDeleteBtn = () => setOnHovering(false);
    return (
        <StyledWrapper
            onMouseEnter={showDeleteBtn}
            onMouseLeave={hiddenDeleteBtn}
            onDoubleClick={handleDoubleClick}
        >
            <span>
                {completed ? <del>{todoData}</del> : todoData}
            </span>
            {onHovering && <button onClick={handleDelete}>x</button>}
        </StyledWrapper>
    );
};

export default TodoDetail;