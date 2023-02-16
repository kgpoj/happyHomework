import React from 'react';
import TodoList from "./components/TodoList";
import mockTodoData from "./constants/mockTodoData";

if (!sessionStorage.getItem('mockTodoData')) {
    sessionStorage.setItem('mockTodoData', JSON.stringify(mockTodoData))
}

function App() {

    return (
        <div>
            <TodoList />
        </div>
    );
}

export default App;
