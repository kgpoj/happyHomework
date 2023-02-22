import React, {useState} from 'react';
import styled from "styled-components";
import TodoCheckbox from "./TodoCheckbox";
import EditTodoInput from "./EditTodoInput";
import TodoDetail from "./TodoDetail";

export const TodoListItem = styled.li`
  height: 50px;
  padding: 0 0;
  border-bottom: 2px solid #f5f5f5;
  display: flex;
  align-items: center;
  font-size: 20px;
  transition: all .2s cubic-bezier(.645, .045, .355, 1);

  &:hover {
    box-shadow: 0 3px 6px 0 rgb(0 0 0 / 12%);
  }
`

interface ListItemProps {
    todoId: number,
    todoData: string,
    todoStatus: string,
    refreshPage: () => void,
}

const ListItem = ({todoId, todoData, todoStatus, refreshPage}: ListItemProps) => {
    const [editing, setEditing] = useState(false);
    const [editingTodo, setEditingTodo] = useState('');
    const triggerEdit = (data: string) => {
        setEditing(true)
        setEditingTodo(data)
    };

    const exitEdit = () => {
        setEditing(false)
    };
    const handleEditingTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => setEditingTodo(e.target.value);
    return (
        <TodoListItem>
            <TodoCheckbox refreshPage={refreshPage} checked={todoStatus === 'completed'} todoId={todoId}/>
            {editing
                ?
                <EditTodoInput
                    value={editingTodo}
                    onChange={handleEditingTodoChange}
                    todoId={todoId}
                    refreshPage={refreshPage}
                    exitEdit={exitEdit}
                />
                :
                <TodoDetail
                    completed={todoStatus === 'completed'}
                    todoId={todoId}
                    onDoubleClick={triggerEdit}
                    todoData={todoData}
                    refreshPage={refreshPage}
                />
            }
        </TodoListItem>
    )
};

export default ListItem;