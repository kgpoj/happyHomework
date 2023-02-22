import React from 'react';
import {updateTodo} from "../api/todoList";
import Input from "./Input";
import styled from "styled-components";

interface Props {
    refreshPage: () => void,
    todoId: number,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
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

const EditTodoInput = ({refreshPage, todoId, value, onChange}: Props) => {
    const saveEditResult = () => {
        updateTodo(todoId, {data: value})
        refreshPage();
    };

    return (
        <StyledWrapper>
            <Input
                type={"text"}
                value={value}
                onPressEnter={saveEditResult}
                onChange={onChange}
                validation={[{type: "required", message: "Todo can not be empty"}]}
                validateOnBlur
                autoFocus
                onBlur={saveEditResult}
            />
        </StyledWrapper>
    );
};

export default EditTodoInput;