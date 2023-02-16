import React from 'react';
import {getByText, render, screen} from '@testing-library/react';
import TodoList from "./TodoList";
import mockTodoData from "../constants/mockTodoData";
import userEvent from "@testing-library/user-event";
import App from "../App";

const mockedOnUpdate = jest.fn()
const title = 'hello';
describe('TodoList', () => {
    it('should render data and checked status correctly', () => {
        render(<TodoList title={title} dataSource={mockTodoData} onUpdate={mockedOnUpdate}/>)
        const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[]

        expect(screen.getByText(title)).toBeInTheDocument();
        mockTodoData.forEach((item, index) => {
            const checked = item.status === 'completed'
            expect(checkboxes[index].checked).toBe(checked)
            expect(screen.getByText(item.data)).toBeInTheDocument();
        })
    });

    // a test of full scenarios user interaction, but not a proper component unit test
    it('should change checked status',() => {
        render(<App/>)
        let checkbox = screen.getAllByRole('checkbox')[0] as HTMLInputElement
        expect(checkbox).not.toBeChecked()

        userEvent.click(checkbox)
        expect(checkbox).toBeChecked()
    });

    it('should not rerender(for test)', function () {
        let title = 'title1'
        render(<TodoList title={title} dataSource={mockTodoData} onUpdate={mockedOnUpdate}/>)
        expect(screen.getByText('title1')).toBeInTheDocument()
        title = 'title2'
        expect(screen.getByText('title1')).toBeInTheDocument()
        expect(screen.queryByText('title2')).not.toBeInTheDocument()
    });

    // a proper component unit test
    it('should add new todo correctly', function () {
        render(<TodoList title={title} dataSource={mockTodoData} onUpdate={mockedOnUpdate}/>)
        const newTodo = 'new todo';
        expect(screen.queryByText(newTodo)).not.toBeInTheDocument()
        const input = screen.getByRole('textbox')
        userEvent.click(input)
        userEvent.keyboard('new todo[Enter]')
        expect(mockedOnUpdate).toHaveBeenCalledWith([...mockTodoData, {data: newTodo, status: 'active'}])
    });
})