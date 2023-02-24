import React, {useRef, useState} from 'react';
import {createTodo} from "../api/todoList";
import Input from "./Input";
import styled from "styled-components";
import {InputRef} from "../interface/Input";

interface Props {
    refreshPage: () => void
}

const StyledWrapper = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  height: 30px;
  align-items: center;

  input {
    width: 80%;
    height: 100%;
  }

  button {
    color: white;
    height: 100%;
    width: 15%;
    background-color: #1677ff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all .2s cubic-bezier(.645, .045, .355, 1);
  }

  button:hover {
    background-color: #4096ff
  }
`

const validation = [
    {
        type: "required",
        value: true,
        message: "Todo can not be empty"
    },
    {
        type: "maxLength",
        value: 30,
        message: "The max length is 30"
    }
];

const NewTodoInput = ({refreshPage}: Props) => {
    const [newTodo, setNewTodo] = useState('');
    const inputRef = useRef<InputRef>(null);
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo(e.target.value)
    };
    const saveTodo = () => {
        createTodo(newTodo)
        setNewTodo('');
        refreshPage()
    };

    const handleClick = () => {
        if (inputRef.current && inputRef.current.reportValidity()) {
            saveTodo()
        }
    };
    return (
        <StyledWrapper>
            <Input
                type={"text"}
                value={newTodo}
                placeholder={'Enter new Todo item'}
                onChange={handleOnChange}
                onPressEnter={saveTodo}
                validation={validation}
                ref={inputRef}
            />
            <button onClick={handleClick}>Add</button>
        </StyledWrapper>
    );
}

export default NewTodoInput;