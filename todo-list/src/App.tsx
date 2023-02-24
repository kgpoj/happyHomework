import React from 'react';
import TodoList from "./components/TodoList";
import mockTodoData from "./constants/mockTodoData";

if (!sessionStorage.getItem('mockTodoData')) {
    sessionStorage.setItem('mockTodoData', JSON.stringify(mockTodoData))
}

const App = () => <TodoList/>;

export default App;
