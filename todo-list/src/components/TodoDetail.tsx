import React, {useState} from 'react';
import {deleteTodo} from "../api/todoList";
import styled from "styled-components";
import deleteImg from '../delete.png'

interface TodoDetailProps {
    todoId: number,
    onDoubleClick: () => void,
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

function TodoDetail({todoId, onDoubleClick, data, refreshPage, completed}: TodoDetailProps) {
    const [onHovering, setOnHovering] = useState(false);
    const handleDelete = (id: number) => {
        deleteTodo(id)
        refreshPage();
    };
    return (
        <StyledWrapper
            onMouseEnter={() => setOnHovering(true)}
            onMouseLeave={() => setOnHovering(false)}
        >
            <span onDoubleClick={onDoubleClick}>
                {completed ? <del>{data}</del> : data}
            </span>
            {onHovering && <button onClick={() => handleDelete(todoId)}>x</button>}
        </StyledWrapper>
    );
}

export default TodoDetail;