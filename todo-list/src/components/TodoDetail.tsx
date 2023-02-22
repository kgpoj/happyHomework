import React, {useState} from 'react';
import {deleteTodo} from "../api/todoList";
import styled from "styled-components";
import deleteImg from '../delete.png'

interface TodoDetailProps {
    todoId: number,
    onDoubleClick: (id: number, data: string) => void,
    data: string,
    refreshPage: () => void,
    completed: boolean
}

const StyledWrapper = styled.span`
  display: flex;
  flex: 1;
  cursor: pointer;

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

const TodoDetail = ({todoId, onDoubleClick, data, refreshPage, completed}: TodoDetailProps) => {
    const [onHovering, setOnHovering] = useState(false);
    const handleDelete = () => {
        deleteTodo(todoId)
        refreshPage();
    };
    const handleDoubleClick = () => {
        onDoubleClick(todoId, data)
    }
    const showDeleteBtn = () => setOnHovering(true);
    const hiddenDeleteBtn = () => setOnHovering(false);
    return (
        <StyledWrapper
            onMouseEnter={showDeleteBtn}
            onMouseLeave={hiddenDeleteBtn}
        >
            <span onDoubleClick={handleDoubleClick}>
                {completed ? <del>{data}</del> : data}
            </span>
            {onHovering && <button onClick={handleDelete}>x</button>}
        </StyledWrapper>
    );
};

export default TodoDetail;