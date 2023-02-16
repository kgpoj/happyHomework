import React from 'react';
import {render, screen} from '@testing-library/react';
import TodoList from "./TodoList";
import mockTodoData from "../constants/mockTodoData";
import userEvent from "@testing-library/user-event";
import App from "../App";

const title = "What's next?";
describe('TodoList', () => {
    it('should render data and checked status correctly', () => {
        render(<TodoList />)
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
        const checkbox = screen.getAllByRole('checkbox')[0] as HTMLInputElement
        expect(checkbox).not.toBeChecked()

        userEvent.click(checkbox)
        expect(checkbox).toBeChecked()
    });

    // a proper component unit test
    it('should add new todo correctly', function () {
        render(<TodoList/>)
        const newTodo = 'new todo';
        expect(screen.queryByText(newTodo)).not.toBeInTheDocument()
        const input = screen.getByRole('textbox')
        userEvent.click(input)
        userEvent.keyboard('new todo[Enter]')
        expect(screen.getByText(newTodo)).toBeInTheDocument()
    });
})