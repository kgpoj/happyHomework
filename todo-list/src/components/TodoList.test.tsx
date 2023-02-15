import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from "./TodoList";
import mockTodoData from "../constants/mockTodoData";
import userEvent from "@testing-library/user-event";
import {TodoItem} from "../interface/TodoItem";

describe('TodoList', () => {
    it('should render data and checked status correctly', () => {
        const title = 'hello';
        render(<TodoList title={title} dataSource={mockTodoData} onUpdate={jest.fn}/>)
        const list = screen.getByRole('list');
        const checkboxes = Array.from(list.childNodes).map((listItem => listItem.firstChild)) as HTMLInputElement[]
        expect(screen.getByText(title)).toBeInTheDocument();
        mockTodoData.forEach((item, index) => {
            const checked = item.status === 'completed'
            expect(checkboxes[index].checked).toBe(checked)
            expect(screen.getByText(item.data)).toBeInTheDocument();
        })
    });

    it('should change checked status',() => {
        let dataSource = mockTodoData
        const setDataSource = (newData: TodoItem[]) => {
            dataSource = newData
        }
        const {rerender} = render(<TodoList title={'hello'} dataSource={dataSource} onUpdate={setDataSource}/>);
        let list = screen.getByRole('list');
        let checkbox = list.firstChild!.firstChild as HTMLInputElement
        expect(checkbox).not.toBeChecked()

        userEvent.click(checkbox)
        rerender(<TodoList title={'hello'} dataSource={dataSource} onUpdate={setDataSource}/>)
        expect(checkbox).toBeChecked()
    });
})