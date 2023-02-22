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
    const saveEditResult = (id: number) => {
        updateTodo(id, {data: value})
        refreshPage();
    };

    const handleBlur = () => {
        saveEditResult(todoId);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e)
    };
    const handlePressEnter = () => {
        saveEditResult(todoId);
    };
    return (
        <StyledWrapper>
            <Input
                type={"text"}
                value={value}
                onPressEnter={handlePressEnter}
                onChange={handleChange}
                validation={[{type: "required", message: "Todo can not be empty"}]}
                validateOnBlur
                autoFocus
                onBlur={handleBlur}
            />
        </StyledWrapper>
    );
};

export default EditTodoInput;