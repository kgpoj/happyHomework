import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from "./TodoList";
import mockTodoData from "../constants/mockTodoData";

describe('TodoList', () => {
    it('should render data and checked status correctly', () => {
        const title = 'hello';
        render(<TodoList title={title} dataSource={mockTodoData}/>)
        const list = screen.getByRole('list');
        const checkboxes = Array.from(list.childNodes).map((listItem => listItem.firstChild)) as HTMLInputElement[]
        expect(screen.getByText(title)).toBeInTheDocument();
        mockTodoData.forEach((item, index) => {
            const checked = item.status === 'completed'
            expect(checkboxes[index].checked).toBe(checked)
            expect(screen.getByText(item.data)).toBeInTheDocument();
        })
    })
})