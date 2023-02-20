import React from 'react';
import {render, screen} from '@testing-library/react';
import TodoList from "./TodoList";
import mockTodoData from "../constants/mockTodoData";
import userEvent from "@testing-library/user-event";
import App from "../App";

const title = "What's next?";
describe('TodoList', () => {
    beforeEach(() => {
        sessionStorage.setItem('mockTodoData', JSON.stringify(mockTodoData))
    })
    it('should render data and checked status correctly', () => {
        render(<TodoList/>)
        const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[]

        expect(screen.getByText(title)).toBeInTheDocument();
        mockTodoData.forEach((item, index) => {
            const checked = item.status === 'completed'
            expect(checkboxes[index].checked).toBe(checked)
            expect(screen.getByText(item.data)).toBeInTheDocument();
        })
    });

    // a test of full scenarios user interaction, but not a proper component unit test
    it('should change checked status', () => {
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

    it('should change todo by double click', function () {
        render(<TodoList/>)
        const existTodo = 'active todo item'
        const todo = screen.getByText(existTodo);
        expect(todo).toBeInTheDocument()

        const newTodo = 'active todo item with new text';
        expect(screen.queryByText(newTodo)).not.toBeInTheDocument()

        userEvent.dblClick(todo)
        userEvent.keyboard(' with new text[Enter]')
        expect(screen.getByText(newTodo)).toBeInTheDocument()
        expect(todo).not.toBeInTheDocument()
    });

    it('should delete todo', function () {
        render(<TodoList/>)
        const existTodo = 'active todo item'
        const todo = screen.getByText(existTodo);
        expect(todo).toBeInTheDocument()

        let deleteButton = screen.queryByRole('button', {
            name: /x/i
        })
        expect(deleteButton).not.toBeInTheDocument()
        userEvent.hover(todo)
        deleteButton = screen.getByRole('button', {
            name: /x/i
        })
        expect(deleteButton).toBeInTheDocument()

        userEvent.click(deleteButton)
        expect(todo).not.toBeInTheDocument()
    });

    it('should show bottom bar with the correct number of left todos', function () {
        render(<TodoList/>)
        expect(screen.getByText('2 items left')).toBeInTheDocument()

        const input = screen.getByRole('textbox')
        userEvent.click(input)
        userEvent.keyboard('new todo[Enter]')
        expect(screen.queryByText('2 items left')).not.toBeInTheDocument()
        expect(screen.getByText('3 items left')).toBeInTheDocument()
    });

    it('should filter correctly', function () {
        render(<TodoList/>)
        const allButton = screen.getByRole('radio', {
            name: /all/i
        })
        const activeButton = screen.getByRole('radio', {
            name: /active/i
        })
        const completedButton = screen.getByRole('radio', {
            name: /completed/i
        })
        expect(allButton).toBeInTheDocument()
        expect(activeButton).toBeInTheDocument()
        expect(completedButton).toBeInTheDocument()
        expect(screen.getByText('active todo item')).toBeInTheDocument()
        expect(screen.getByText('completed todo item')).toBeInTheDocument()

        userEvent.click(activeButton)
        expect(screen.getByText('active todo item')).toBeInTheDocument()
        expect(screen.queryByText('completed todo item')).not.toBeInTheDocument()

        userEvent.click(completedButton)
        expect(screen.queryByText('active todo item')).not.toBeInTheDocument()
        expect(screen.getByText('completed todo item')).toBeInTheDocument()

        userEvent.click(allButton)
        expect(screen.getByText('active todo item')).toBeInTheDocument()
        expect(screen.getByText('completed todo item')).toBeInTheDocument()
    });
})