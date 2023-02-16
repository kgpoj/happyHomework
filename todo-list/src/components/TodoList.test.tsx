import React from 'react';
import {getByText, render, screen} from '@testing-library/react';
import TodoList from "./TodoList";
import mockTodoData from "../constants/mockTodoData";
import userEvent from "@testing-library/user-event";
import {TodoItem} from "../interface/TodoItem";

describe('TodoList', () => {
    it('should render data and checked status correctly', () => {
        const title = 'hello';
        render(<TodoList title={title} dataSource={mockTodoData} onUpdate={jest.fn}/>)
        const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[]

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
        let checkbox = screen.getAllByRole('checkbox')[0] as HTMLInputElement
        expect(checkbox).not.toBeChecked()

        userEvent.click(checkbox)
        rerender(<TodoList title={'hello'} dataSource={dataSource} onUpdate={setDataSource}/>)
        expect(checkbox).toBeChecked()
    });

    it('should not rerender(for test)', function () {
        let title = 'title1'
        render(<TodoList title={title} dataSource={mockTodoData} onUpdate={jest.fn}/>)
        expect(screen.getByText('title1')).toBeInTheDocument()
        title = 'title2'
        expect(screen.getByText('title1')).toBeInTheDocument()
        expect(screen.queryByText('title2')).not.toBeInTheDocument()
    });

})