import React from 'react';
import {updateTodo} from "../api/todoList";
import Input from "./Input";
import styled from "styled-components";

interface Props {
    refreshPage: () => void,
    todoId: number,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    exitEdit: () => void
}

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: end;

  & {
    input {
      width: 100%;
      font-size: 20px;
    }
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

const EditTodoInput = ({ refreshPage, todoId, value, onChange, exitEdit }: Props) => {
    const saveEditResult = () => {
        updateTodo(todoId, {data: value})
        exitEdit()
        refreshPage();
    };

    return (
        <StyledWrapper>
            <Input
                type={"text"}
                value={value}
                onPressEnter={saveEditResult}
                onChange={onChange}
                validation={validation}
                validateOnBlur
                autoFocus
                onBlur={saveEditResult}
            />
        </StyledWrapper>
    );
}

export default EditTodoInput;